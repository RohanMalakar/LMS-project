import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux"; 
import { AddQuiz } from '../../Redux/Slices/QuizSlices.js';
import Homelayout from '../../Layouts/Homelayout.jsx';
import QuizPublished from '../Pop_upMessage.jsx';


const AddQuizForm = () => {

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { title: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);
  const [error, setError] = useState('');
  const [ispublic, setIspublic] = useState(false);
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //to get the course details from the parent component
  const { state } = useLocation();

  const courseId = state._id;
  
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].title = e.target.value;
    setQuestions(updatedQuestions);
  };
  
  const handleOptionChange = (qIndex, oIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = oIndex;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { title: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const validateForm = () => {
    if (!title || !state) return false;
    for (let question of questions) {
      if (!question.title || question.options.includes('') || question.correctAnswer === '') {
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    const data={title,courseId, questions};
    dispatch(AddQuiz(data));
    setIspublic(true);
  };

  return (
    <Homelayout>
    {!ispublic ?
    (<div className="flex justify-center pt-20 items-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Quiz Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter quiz title"
          />
        </div>

        {/* Questions */}
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Question {qIndex + 1}</label>
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter question text"
            />

            {/* Options */}
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  placeholder={`Option ${oIndex + 1}`}
                />
                <input
                  type="radio"
                  name={`correctAnswer-${qIndex}`}
                  checked={question.correctAnswer === oIndex}
                  onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                  className="form-radio text-blue-500 h-5 w-5"
                />
                <label className="ml-2 text-blue-950">Correct</label>
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Public Quiz
          </button>
        </div>
      </form>
    </div>):
    ( 
       <QuizPublished/>
    )}
    </Homelayout>
  );
};

export default AddQuizForm;
