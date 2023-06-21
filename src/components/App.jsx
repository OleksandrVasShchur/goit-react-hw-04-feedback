import React, { useState } from 'react';

import Statistic from './statistic/statistic';
import Section from './section/section';
import FeedbackOptions from './feedbackOptions/feedbackOptions';
import Notification from './notification/notification';
import css from './style-app/App.module.css';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = option => {
  
    switch (option.target.name) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedback = totalFeedback => {
    if (totalFeedback > 0) {
      return Math.round((good / totalFeedback) * 100);
    }
    return 0;
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedback = countPositiveFeedback(totalFeedback);

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">

        <FeedbackOptions
          options={Object.keys({good, neutral, bad})}
          onLeaveFeedback={feedback}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {totalFeedback ? (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positiveFeedback={positiveFeedback}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
};
