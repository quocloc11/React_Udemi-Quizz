import _ from 'lodash'
const Question = (props) => {
  const { data, index } = props
  if (_.isEmpty(data)) {
    return (<></>)
  }

  const handleHanleCheckBox = (event, aId, qId) => {

    props.handleCheckBox(aId, qId)
  }
  return (
    <>
      {data.image ?
        <div className='q-image'>
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
        :
        <div className='q-image'>

        </div>
      }
      <div className="question">Question {index + 1}: {data.questionDescription}?</div>
      <div className="answer">
        {data.answers && data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`}
                className="a-child">
                <div class="form-check">
                  <input class="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(event) => handleHanleCheckBox(event, a.id, data.questionId)}
                  />
                  <label class="form-check-label" >
                    {a.description}
                  </label>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Question