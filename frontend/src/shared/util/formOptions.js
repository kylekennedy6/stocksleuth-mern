import React from 'react';

export const FORMAT_DATE = (date) => {
  let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString([],options);
}

export const YEAR_OPTIONS = () => {
  const currentYear = (new Date(Date.now())).getFullYear()
  const startYear = currentYear - 2;
  const endYear = currentYear + 2;
  let options = [];
  for (let year = startYear; year < endYear; year++){
    options.push(year.toString())
  }
  return options;
}

export const BEAT_MISS_OPTIONS = () => {
  const beatMissOptions = [];
  for (let i=0; i<9; i++){
    beatMissOptions.push(<option value={i}>{i}</option>)
  }
  return beatMissOptions;
}

export const RAISE_CUT_OPTIONS = () => {
  const raiseCutOptions = [];
  for (let i=0; i<4; i++){
    raiseCutOptions.push(<option value={i}>{i}</option>)
  }
  return raiseCutOptions;
}

export const SA_RATING_OPTIONS = () => {
  const options = 
  ['Very Bearish', 'Bearish', 'Neutral', 'Bullish', 'Very Bullish'];
  return options.map( rating => {
    return (
    <option value={rating}>{rating}</option>
    );
  });
}

export const SA_GRADING_OPTIONS = () => {
  const options = 
  [
    'A+', 'A', 'A-',
    'B+', 'B', 'B-',
    'C+', 'C', 'C-',
    'D+', 'D', 'D-',
    'E+', 'E', 'E-',
    'F'
  ];
  return options.map( grade => {
    return (
    <option value={grade}>{grade}</option>
    );
  });
}

export const HYPOTHESIS_OPTIONS = () => {
  const options = 
  [
    'Consensus Decrease on NE',
    'Consensus Increase on NE',
    'Cut Guidance on NE',
    'Raise Guidance on NE'
  ]
  return options.map( hypothesis => {
    return (
    <option value={hypothesis}>{hypothesis}</option>   
    );
  });
}

export const DIRECTION_OPTIONS = () => {
  const options = 
  [
    'Short',
    'Long',
    'Bi-Directional',
  ]
  return options.map( direction => {
    return (
    <option value={direction}>{direction}</option>   
    );
  });
}