import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {introPage} from './styles';
import axios from 'axios';
import {CategorySelectModal, TimerComponent} from '../components';

const Intro = (props) => {
  const [timerFlag, setTimerFlag] = useState(false);
  const [counterFlag, setCounterFlag] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  // const [modalFlag_1, setModalFlag_1] = useState(false);
  const dispatch = useDispatch();
  const showModal = useSelector((global) => global.playAgain);

  const startGame = (selectedCategory) => {
    // axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}&type=boolean`)
    axios
      .get(`https://opentdb.com/api.php?`, {
        params: {
          amount: 10,
          category: selectedCategory.id,
          type: 'boolean',
          encode: 'base64',
        },
      })
      .then((response) => {
        const {
          data: {results},
        } = response;

        dispatch({type: 'SET_QUESTIONS', payload: {questions: results}});
      });

    setModalFlag(false);
    setTimerFlag(true);
    setCounterFlag(true);
    dispatch({type: 'ACTIVATE_MODAL', payload: {makeActive: false}});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={introPage.container}>
          <Text style={introPage.bannerText}>Trivia!</Text>
        </View>
        <View style={introPage.container}>
          <TouchableOpacity
            style={introPage.buttonContainer}
            onPress={() => setModalFlag(true)}>
            <Text style={introPage.buttonText}>Start!</Text>
          </TouchableOpacity>
        </View>

        <CategorySelectModal
          visibility={modalFlag || showModal}
          onClose={() => {
            dispatch({type: 'ACTIVATE_MODAL', payload: {makeActive: false}});
            setModalFlag(false);
          }}
          onCategorySelect={startGame}
        />

        <TimerComponent
          visibility={timerFlag}
          counterFlag={counterFlag}
          onTimerCompleted={() => {
            setTimerFlag(false);
            props.navigation.navigate('Questions');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export {Intro};
