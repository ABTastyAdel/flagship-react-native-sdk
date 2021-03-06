import PropTypes from 'prop-types';
import React from 'react';
import {Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as s} from 'react-native-style-tachyons';
import {ScrollView} from 'react-native-gesture-handler';
import loadingGif from '../../assets/loading.gif';
const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3]}>
        <Text style={[s.f3, s.pv3, s.tc]}>Welcome to Reana !</Text>
        <Text style={[s.f6, s.pv3]}>
          Reana is a demo app for the React-Native Flagship SDK.
        </Text>
        <Text style={[s.f6, s.pv3]}>This is a QA app.</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            resizeMode: 'stretch',
          }}
          source={loadingGif}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

Home.propTypes = {
  classes: PropTypes.shape({}),
};

Home.defaultProps = {
  classes: {},
};

export default Home;
