import React from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {Spin} from 'antd'

import GradingForm from '../components/GradingForm'

import {submit, delist} from '../ducks/grading'

import {submissionsSelector, delistedSelector} from '../ducks/grading.selector'

import {grades, genders} from '../core/options'

// prettier-ignore
const Heading = styled.h1`
  margin: 0;
`

const SubHeading = styled.h2`
  color: #666;
  font-size: 1.08em;

  margin-top: 0.3em;
  margin-bottom: 0.95em;

  text-transform: capitalize;
`

const Grading = ({data, role, delist, delistedBy, submit, initial}) => {
  if (data) {
    return (
      <div>
        <Heading>
          <span>ตรวจให้คะแนน: ผู้สมัคร #{data.number}</span>
          {delistedBy && (
            <span style={{color: '#F03434'}}>
              {' '}
              -- ถูกคัดออกไปแล้วโดย {delistedBy}
            </span>
          )}
        </Heading>

        <SubHeading>
          {role === 'core' && <span> สาขา: {data.major} | </span>}
          อายุ: {data.age} | ระดับชั้น: {grades[data.class]} | เพศ:{' '}
          {genders[data.gender]}
        </SubHeading>

        <GradingForm
          role={role}
          data={data}
          delist={delist}
          onSubmit={submit}
          initialValues={data}
          disabled={!!delistedBy}
        />
      </div>
    )
  }

  return <Spin />
}

const mapStateToProps = (state, props) => ({
  role: state.user.role,
  data: submissionsSelector(state, props),
  delistedBy: delistedSelector(state, props),
})

const mapDispatchToProps = (dispatch, {match}) => {
  const {id} = match.params

  return {
    submit: data => dispatch(submit(id, data)),
    delist: () => dispatch(delist(id)),
  }
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(Grading)
