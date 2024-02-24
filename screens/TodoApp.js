import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../redux/actions';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]
const EditableTodoCard = ({ item, handleDeleteTodo, handleUpdateTodo }) => {

  const StatusColor = {
    "due": "orange",
    "done": "green",
    "late": "red"
  }

  const [isEditing, setIsEditing] = React.useState(false)
  const [task, setTask] = React.useState(item.task)

  const handleEdit = () => {
    if (isEditing) {
      handleUpdateTodo(item.id, item.status, task)
    }
    setIsEditing(!isEditing)
  }

  const handleChangeStatus = (status) => {
    handleUpdateTodo(item.id, status, item.task)
  }

  return (
    <Card
    style={{backgroundColor: StatusColor[item.status]}}
    >
      <Card.Title
        title={`Task#${item.id}`}
        subtitle={item.status.capitalize()}
        left={(props) => <Icon name="tasks" size={24} color="black" />}
        right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
      />
      <Card.Content>
        { isEditing ? 
          <TextInput
            value={task}
            onChangeText={task => setTask(task)}
          ></TextInput>
        : <Paragraph>{item.task}</Paragraph> }
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleEdit}>{isEditing ? 'Save' : 'Edit'}</Button>
        <Button onPress={() => handleChangeStatus('due')}>Due</Button>
        <Button onPress={() => handleChangeStatus('done')}>Done</Button>
        <Button onPress={() => handleChangeStatus('late')}>Late</Button>
      </Card.Actions>
    </Card>
  );
}

const TodoApp = ({ todo_list, addTodo, deleteTodo, updateTodo }) => {
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task)
    setTask('')
  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }

  const handleUpdateTodo = (id, status, task) => {
    console.log("handleUpdateTodo", id, status, task)
    updateTodo(id, status, task)
  }

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleAddTodo} disabled={task.length == 0}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
            <EditableTodoCard item={item} handleDeleteTodo={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo} />
            <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo, updateTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
