import { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid'
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz } from "../../../../services/apiServices"

import _ from 'lodash'
const Questions = (props) => {



  const [questions, setQuestions] = useState(
    [
      {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: '',
            description: '',
            isCorrect: false
          },

        ]
      },

    ]
  )
  const [isPreviewImage, setIsPreviewImage] = useState(false)
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: ''
  })
  const [listQuiz, setListQuiz] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState({})

  useEffect(() => {
    fetQuiz()
  }, [])

  const fetQuiz = async () => {
    let res = await getAllQuizForAdmin()
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`
        }
      })
      setListQuiz(newQuiz)
    }
  }


  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion =
      {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: '',
            description: '',
            isCorrect: false
          }
        ]
      }
      setQuestions([...questions, newQuestion])
    }
    if (type === 'REMOVE') {
      let questionClone = _.cloneDeep(questions)

      questionClone = questionClone.filter(item => item.id !== id)
      setQuestions(questionClone)
    }
  }
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions)
    if (type === 'ADD') {
      const newAnswer =
      {
        id: uuidv4(),
        description: '',
        isCorrect: false
      }
      let index = questionClone.findIndex(item => item.id === questionId)
      questionClone[index].answers.push(newAnswer)
      setQuestions(questionClone)
    }
    if (type === 'REMOVE') {
      let index = questionClone.findIndex(item => item.id === questionId)
      questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
      setQuestions(questionClone)

    }
  }
  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      let questionClone = _.cloneDeep(questions)
      let index = questionClone.findIndex(item => item.id === questionId)

      if (index > -1) {

        questionClone[index].description = value
        setQuestions(questionClone)

      }
    }
  }
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)

    if (index > -1 && event.target && event.target.files && event.target.files[0]) {

      questionClone[index].imageFile = event.target.files[0]
      questionClone[index].imageName = event.target.files[0].name
      setQuestions(questionClone)
    }
  }
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)

    if (index > -1) {
      questionClone[index].answers =
        questionClone[index].answers.map(answer => {
          if (answer.id === answerId) {
            if (type === 'CHECKBOX') {

              answer.isCorrect = value
            } if (type === 'INPUT') {

              answer.description = value
            }
          }
          return answer
        })

      setQuestions(questionClone)
    }
  }

  const handleSubmitQuestionForQuiz = async () => {
    //postCreateNewAnswerForQuestion,postCreateNewQuestionForQuiz

    await Promise.all(questions.map(async (question) => {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile)

      await Promise.all(question.answers.map(async (answer) => {
        await postCreateNewAnswerForQuestion(
          answer.description, answer.isCorrect, q.DT.id

        )
      }))

    }))
  }
  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName
      })
      setIsPreviewImage(true)
    }
  }
  return (
    <div className="questions-container">
      <div className="title">
        Manage Questions
      </div>
      <hr />
      <div className="add-new-question">
        <div className='col-6 form-group'>
          <label className='mb-2'>Select Quiz:</label>
          <Select
            defaultValue={setSelectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className='mt-3 mb-2'>
          Add questions:

        </div>
        {questions && questions.length > 0
          && questions.map((question, index) => {
            return (
              <div key={questions.id} className='q-main mb-4'>

                <div className='questions-content'>

                  <div className="form-floating description ">
                    <input
                      type="type"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                    />
                    <label>Question {index + 1} 's Description</label>
                  </div>
                  <div className='group-upload'>
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className='label-up' />
                    </label>
                    <input
                      id={`${question.id}`}
                      type={'file'}
                      hidden
                      onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                    />
                    <span>
                      {question.imageName ?
                        <span style={{ cursor: 'pointer' }}
                          onClick={() => handlePreviewImage(question.id)}>
                          {question.imageName}</span>
                        : '0 file is uploaded'}
                    </span>
                  </div>
                  <div className='btn-add'>
                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                      <AiOutlinePlusCircle className='icon-add' />
                    </span>
                    {questions.length > 1 &&
                      <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                        <AiFillMinusCircle className='icon-remove' />
                      </span>
                    }
                  </div>

                </div>
                {question.answers && question.answers.length > 0
                  && question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className='answers-content'>
                        <input className="form-check-input isCorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                        />
                        <div className="form-floating anwser-name ">
                          <input
                            value={answer.description}
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}

                          />
                          <label>Answers {index + 1}</label>
                        </div>
                        <div className='btn-group'>
                          <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                            <AiFillPlusSquare className='icon-add' />
                          </span>
                          {question.answers.length > 1 &&
                            <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                              <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                          }
                        </div>

                      </div>
                    )
                  })
                }



              </div>
            )
          })
        }

        {questions && questions.length > 0 &&
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className='btn btn-warning'>Save Questi</button>
          </div>

        }

        {isPreviewImage === true &&
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        }


      </div>

    </div>
  )
}

export default Questions