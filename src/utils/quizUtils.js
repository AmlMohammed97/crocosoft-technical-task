import { v4 as uuid } from "uuid";
export const isYotubeVideoUrlValid = (url) => {
    var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
        return true;
    }
    return false;
};

const construcAnswers = (quizAnswers, correctAnswerIndex) => {
    const answers = [];
    Object.entries(quizAnswers).forEach(entry => {
        const [key, value] = entry;
        answers.push({
            id: uuid(),
            is_true: parseInt(key, 10) === correctAnswerIndex,
            text: value
        });
    });
    return answers;
}

const constructQuestionAnswers = (quizQuestions) => {
    const questionAnswers = [];
    Object.values(quizQuestions).forEach(question => {
        questionAnswers.push({
            id: uuid(),
            feedback_false: question.wrongFeedback,
            feedback_true: question.trueFeedback,
            text: question.question,
            answer_id: null,
            answers: construcAnswers(question.answers, question.correctAnswerIndex)
        });
    });
    return questionAnswers;
}
export const constructQuizz = (quizTitle, quizYotubeUrl, quizDescription, quizQuestions, creationDate) => {
    const todayDate = new Date();
    const currentDate = `${todayDate.toISOString().split('T')[0]} ${todayDate.toTimeString().split(' ')[0]}`;
    return ({
        created: creationDate || currentDate,
        description: quizDescription,
        id: uuid(),
        modified: currentDate,
        score: null,
        title: quizTitle,
        url: quizYotubeUrl,
        questions_answers: constructQuestionAnswers(quizQuestions)
    })
}