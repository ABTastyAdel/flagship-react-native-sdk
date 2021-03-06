import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFlagship} from '@flagship.io/react-sdk';
import {RootStackParamList} from '../../stackContainer';
import LocalNotification from 'react-native-local-notification';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
});

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UseFlagshipDemo'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const UseFlagshipDemo: React.SFC<Props> = ({navigation}) => {
  const {synchronizeModifications} = useFlagship();
  const inputRef = React.useRef('localNotification');
  return (
    <SafeAreaView>
      <ScrollView>
        <LocalNotification ref={inputRef} duration={3000} />
        <View style={styles.body}>
          {/* BOTTOM MENU */}
          <View style={[{borderTopColor: 'black', borderTopWidth: 1}, s.pv2]}>
            <Button
              title="Synchronize Modifications"
              containerStyle={[s.mv1]}
              onPress={() => {
                synchronizeModifications().then((statusCode) => {
                  if (statusCode > 300) {
                    inputRef.current.showNotification({
                      text: 'Sync modifs failed with status=' + statusCode,
                      title: '',
                    });
                  } else {
                    inputRef.current.showNotification({
                      text: 'Sync modifs done ✔️ with status=' + statusCode,
                      title: '',
                    });
                  }
                });
              }}
            />
            <Button
              title="Get Modification info"
              containerStyle={[s.mv1]}
              onPress={() => {
                navigation.navigate('GetModificationInfo');
              }}
            />
            <Button
              title="Send hit demo"
              containerStyle={[s.mv1]}
              onPress={() => {
                navigation.navigate('SendHitDemo');
              }}
            />
            <Button
              title="Go back"
              containerStyle={[s.mv1]}
              onPress={() => {
                navigation.navigate('QaSandbox');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UseFlagshipDemo;
