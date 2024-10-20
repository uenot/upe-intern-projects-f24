
class VideoQuiz {
    constructor(videoId, questions, quizName) {
        this.videoId = videoId;
        //this.start = start,
        //this.stop = stop,        
        this.questions = questions; //array of Question objects
        this.quizName = quizName;
    }
}

export default VideoQuiz;
