import * as api from './api.js'
const host = 'https://parseapi.back4app.com'
api.settings.host = host

export const login = api.login
export const register = api.register
export const logout = api.logout


function createPointer(name, id) {
    return {
        "__type": "Pointer",
        "className": name,
        "objectId": id
    }
}
function addOwner(object) {
    const userId = sessionStorage.getItem('userId')
    object.owner = createPointer('_User', userId)
}


// Quiz Api's

export async function createQuiz(quiz) {
    const userId = sessionStorage.getItem('userId')
    addOwner(quiz)
    return await api.post(host + '/classes/Quiz', quiz)
}

export async function getQuizes() {
    return await api.get(host + '/classes/Quiz')
}
export async function getQuizById(id) {
    const search = encodeURI(`{"objectId":"${id}"}` + '&include=owner')

    return await api.get(host + '/classes/Quiz?where=' + search)
}

export async function updateQuiz(id, quiz) {
    return await api.put(host + '/classes/Quiz/' + id, quiz)
}
export async function deleteQuiz(id) {
    return await api.del(host + '/classes/Quiz/' + id)
}

// Question collection
export async function createQuestion(quizId, question) {
    addOwner(question);
    question.quiz = createPointer('Quiz', quizId)
    return await api.post(host + '/classes/Question', question)
}

export async function getQuestions(quizId) {
    let query = JSON.stringify({ "quiz": createPointer('Quiz', quizId) })
    query = encodeURI(query)


    const response =  await api.get(host + '/classes/Question?where=' + query)
    return response.results;
}
export async function updateQuestion(id, question) {
    return await api.put(host + '/classes/Question' + id, question)
}

export async function deleteQuestion(id) {
    return await api.del(host + '/classes/Question' + id)
}