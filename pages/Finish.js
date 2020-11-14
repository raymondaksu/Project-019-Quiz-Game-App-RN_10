import React from 'react';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import {finishPage} from './styles';

import {useSelector} from 'react-redux';

const Finish = (props) => {
  const userScore = useSelector((global) => global.score);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 3}}>
      <View style={finishPage.container}>
        <Text style={finishPage.text}>Your score is {userScore}</Text>
      </View>
      <View style={finishPage.resetContainer}>
        <TouchableOpacity
          style={finishPage.resetButton}
          onPress={() =>
            props.navigation.navigate(
              'Intro',
              dispatch({type: 'ACTIVATE_MODAL', payload: {makeActive: true}}),
            )
          }>
          <Text style={finishPage.resetText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export {Finish};
