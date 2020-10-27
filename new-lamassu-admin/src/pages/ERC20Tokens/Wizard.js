import { makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as R from 'ramda'
import React, { useState } from 'react'

import Modal from 'src/components/Modal'
import Stepper from 'src/components/Stepper'
import { Button } from 'src/components/buttons'
import { comet } from 'src/styling/variables'

import { step1 } from './wizardHelper'
const NUM_STEPS = 1

const styles = {
  stepper: {
    margin: [[16, 0, 14, 0]]
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    margin: [['auto', 0, 24]]
  },
  button: {
    marginLeft: 'auto'
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  infoTitle: {
    margin: [[18, 0, 20, 0]]
  },
  infoCurrentText: {
    color: comet
  }
}

const useStyles = makeStyles(styles)

const getStep = step => {
  switch (step) {
    case 1:
      return step1
    /* 
    case 2:
      return step1
    case 3:
      return step1
    case 4:
      return step1 
    */
    default:
      return React.Fragment
  }
}

const Wizard = ({ onClose, visible, save }) => {
  const [{ step, config }, setState] = useState({
    step: 1
  })
  const classes = useStyles()
  const isLastStep = step === NUM_STEPS
  const stepOptions = getStep(step)

  const onContinue = async it => {
    const newConfig = R.merge(config, stepOptions.schema.cast(it))

    if (isLastStep) {
      return save(newConfig)
    }

    setState({
      step: step + 1,
      config: newConfig
    })
  }

  return (
    <>
      <Modal
        title="ERC-20 coin addition"
        handleClose={onClose}
        width={520}
        open={visible}>
        <Stepper steps={NUM_STEPS} currentStep={step} />
        <Formik
          enableReinitialize
          onSubmit={onContinue}
          initialValues={stepOptions.initialValues}>
          <Form className={classes.form}>
            <stepOptions.Component />
            <div className={classes.submit}>
              <Button className={classes.button} type="submit">
                {isLastStep ? 'Finish' : 'Next'}
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  )
}

export default Wizard
