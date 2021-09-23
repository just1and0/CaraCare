/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Pressable,
  Modal,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PersonSvg from './components/person';

import { style } from './assets/style';
import { Button } from './components/buttons';
import { CarouselView } from './components/carousel';
import { HeaderItems } from './components/headerItems';
import { TextInput } from './components/textInput'

const App = () => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [targetWater, setTargetWater] = useState<string>('500');
  const [totalWaterDrank, setTotalWaterDrank] = useState<number>(0);
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

  const animatedHeight = useRef(new Animated.Value(0)).current;

  const onIncreaseWaterVolumeTaken = () => {
    animateWaterLevel(calculateAnimationLevel(currentActiveCarouselItem.value, "increase"));
  }

  const onDecreaseWaterVolumeTaken = () => {
    animateWaterLevel(calculateAnimationLevel(currentActiveCarouselItem.value, "decrease"));
  }

  const updateToggleModal = () => {
    setToggleModal(!toggleModal);
  }

  const convertHelper = () => {

    let MLtoL = (value: number | string) => {
      // 1 liter = 1000 ml.
      // X       =  value
      return 1 * parseInt(`${value}`) / 1000;
    }
    return { MLtoL };
  }

  const animateWaterLevel = (toValue: number) => {
    return Animated.timing(animatedHeight, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const calculateAnimationLevel = (currentWaterIntake: number, type: 'increase' | 'decrease') => {
    //  currentSetGoal = maxLevel
    //  Total water drank (currentWaterIntake + prevTatal water drunk) = X

    let currentSetGoal = targetWater;
    let maxLevel = 355;

    if (type == 'increase') {
      let totalWaterDrunk = totalWaterDrank + currentWaterIntake;
      let result = maxLevel * totalWaterDrunk / Number(currentSetGoal);

      // update state values
      setAchievedGoalDay(achievedGoalDay + 1)
      totalWaterDrunk > Number(currentSetGoal) ? setTotalWaterDrank(Number(currentSetGoal)) : setTotalWaterDrank(totalWaterDrunk)

      // store updated data locally 
      const prevState = {
        targetWater,
        totalWaterDrank,
        achievedGoalDay
      };
      const jsonValue = JSON.stringify(prevState)
      AsyncStorage.setItem('@storedState', jsonValue)


      return result;
    } else {
      let totalWaterDrunk = totalWaterDrank - currentWaterIntake;
      let result = maxLevel * totalWaterDrunk / Number(currentSetGoal);

      // update state values
      setAchievedGoalDay(achievedGoalDay - 1)
      totalWaterDrunk < 0 ? setTotalWaterDrank(0) : setTotalWaterDrank(totalWaterDrunk)

      // store updated data locally 
      const prevState = {
        targetWater,
        totalWaterDrank,
        achievedGoalDay
      };
      const jsonValue = JSON.stringify(prevState)
      AsyncStorage.setItem('@storedState', jsonValue)

      return result;
    }
  }

  useEffect(() => {
    // total = 355
    // current = x
    let newAnimatedValue = 355 * totalWaterDrank / Number(targetWater);
    animateWaterLevel(newAnimatedValue)
  }, [targetWater, totalWaterDrank, achievedGoalDay])

  const asyncStorageHelper = () => {

    const storeData = async (value: string, key: string) => {
      try {
        await AsyncStorage.setItem(key, value)
      } catch (e) {
        return e;
      }
    }

    const storeObjectData = async (value: string & number, key: string) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
      } catch (e) {
        return e
      }
    }

    const getData = async (key: string) => {
      try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
          return value;
        }
      } catch (e) {
        return e;
      }
    }

    const getObjectData = async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        return e
      }
    }

    return { storeData, storeObjectData, getData, getObjectData };
  }

  // manage localStorage data
  useEffect(() => {
    asyncStorageHelper().getData('@firstOpen').then(res => {
      if (res === undefined) {
        // first time user
        AsyncStorage.setItem('@firstOpen', 'no')
      } else {
        asyncStorageHelper().getObjectData('@storedState').then(res => {
          setTargetWater(res.targetWater);
          setTotalWaterDrank(res.totalWaterDrank);
          setAchievedGoalDay(res.achievedGoalDay);

          let newAnimatedValue = 355 * res.totalWaterDrank / Number(res.targetWater);
          animateWaterLevel(newAnimatedValue)
        })
      }
    })
  }, [])

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
            <View style={{
              height: 335,
              width: 147,
              overflow: 'hidden'
            }}>
              <Animated.View style={{ backgroundColor: 'yellow', position: 'absolute', zIndex: -100, height: animatedHeight, width: '100%', bottom: 0 }} />
              <PersonSvg />
            </View>

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
