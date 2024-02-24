import firestore from '@react-native-firebase/firestore';

export const addTodo = async (todo) => {
    try {
        const res = await firestore().collection('todos').add(todo);
        console.log('Todo added: ', res.id)
        return res.id;
    } catch (error) {
        console.error('Error adding todo: ', error);
    }
}

export const deleteTodo = async (id) => {
    try {
        await firestore().collection('todos').doc(id).delete();
    } catch (error) {
        console.error('Error deleting todo: ', error);
    }
}

export const updateTodo = async (id, todo) => {
    try {
        await firestore().collection('todos').doc(id).update(todo);
    } catch (error) {
        console.error('Error updating todo: ', error);
    }
}

export const getTodos = async () => {
    try {
        const todos = await firestore().collection('todos').get();
        return todos.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
    } catch (error) {
        console.error('Error getting todos: ', error);
    }
}