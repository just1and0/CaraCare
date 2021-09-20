/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Pressable,
  Modal
} from 'react-native';

import PersonSvg from './components/person';

import { style } from './assets/style';
import { Button } from './components/buttons';
import { CarouselView } from './components/carousel';
import { HeaderItems } from './components/headerItems';
import { TextInput } from './components/textInput'

const App = () => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [targetWater, setTargetWater] = useState<string>('3500');
  const [totalWaterDrank, setTotalWaterDrank] = useState<string>('2400');
  const [achievedGoalDay, setAchievedGoalDay] = useState<number>(0) 

  const isDarkMode = useColorScheme() === 'dark';

  const carouselOptions = [
    {
      value: 150,
      addon: 'ml'
    },
    {
      value: 250,
      addon: 'ml'
    },
    {
      value: 350,
      addon: 'ml'
    }
  ];

  const currentActiveCarouselItem = carouselOptions[carouselIndex];

  const onIncreaseWaterVolumeTaken = () => {
    alert('volume increased')
  }

  const onDecreaseWaterVolumeTaken = () => {
    alert('volume Decreased')
  }

  const updateToggleModal = () => {
    setToggleModal(!toggleModal);
  }

  const convertHelper = () => {

    let MLtoL = (value: string) => {
      // 1 liter = 1000 ml.
      // X       =  value
      return 1 * parseInt(`${value}`) / 1000;
    }
    return { MLtoL };
  }

  return (
    <SafeAreaView style={style().flex}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[style().container, style().flex]}>
        <View style={style().header}>
          <HeaderItems value={convertHelper().MLtoL(totalWaterDrank)} valueAdon={'L'} description={`total water ${`\n`} drunk`} />
          <HeaderItems value={achievedGoalDay} description={`achieved goal ${`\n`} days`} />
        </View>
        <View style={style().body}>
          <View style={style().humanView}>
            <PersonSvg />
            <View style={style().lineView}>
              <View style={style().line} />
              <Pressable onPress={updateToggleModal}>
                <Text style={style().lineText}>
                  {` `} {convertHelper().MLtoL(targetWater)} L
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={style().alertView}>
            <Text style={style().alertViewText}>
              Nice work! Keep {`\n`} it up!
            </Text>
          </View>
        </View>
        <View style={style().footer}>
          <View style={style().footerSliderView}>
            <CarouselView
              data={carouselOptions}
              onChange={(i: number) => setCarouselIndex(i)}
            />
          </View>
          <View style={style().footerButtonView}>
            <Button value={'-'} onPress={onDecreaseWaterVolumeTaken} />
            <View style={style().spacer} />
            <Button value={'+'} onPress={onIncreaseWaterVolumeTaken} />
          </View>
        </View>
      </View>

      <Modal visible={toggleModal} transparent={true} animationType={'slide'}>
        <SafeAreaView style={[style().flex, style().modalView]}>
          <View style={style().modalContent}>
            <Text style={style().modalTitle}>Update Target Water</Text>
            <Text style={style().modalDescription}>Please enter your new water {`\n`} target below:</Text>

            <TextInput
              style={style().TextInput}
              onChangeText={(value: string) => setTargetWater(value)}
              value={targetWater}
            />

            <Pressable onPress={updateToggleModal}>
              <View style={style().button}>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: '600' }}>
                  Update
                </Text>
              </View>
            </Pressable>

          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
};

export default App;
