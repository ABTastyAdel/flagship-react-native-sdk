import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Input, Button, ButtonGroup, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonInputStyle, commonIconStyle} from '../..';
import {StackNavigationProp} from '@react-navigation/stack';
import {setVisitorContextAction} from '../../../../../../redux/stuff/sdkSettings/actions';
import {
  RootStackParamList,
  NewVisitorContextParams,
} from '../../../../stackContainer';
import {RootState} from '../../../../../../redux/rootReducer';
import ErrorBlock from '../../../../../common/ErrorBlock';
import {RouteProp} from '@react-navigation/native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
});

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewVisitorContext'
>;

interface Props {
  navigation: ScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'NewVisitorContext'>;
}

const NewVisitorContext: React.SFC<Props> = ({navigation, route: {params}}) => {
  const visitorContext = useSelector(
    (state: RootState) => state.sdkSettings.visitorContext,
  );
  const dispatch = useDispatch();

  const valueFromRoute: NewVisitorContextParams = params || {
    key: null,
    type: null,
    value: null,
  };

  const types = ['boolean', 'string', 'number'];

  const getIndex = (): null | number => {
    let result = null;
    types.forEach((el, index) => {
      if (el === valueFromRoute.type) {
        result = index;
      }
    });

    return result;
  };

  const [value, setValue] = React.useState<string | boolean | number | null>(
    valueFromRoute.value,
  );
  const [key, setKey] = React.useState<string | null>(valueFromRoute.key);
  const [type, setType] = React.useState<number | null>(getIndex());
  const [error, setError] = React.useState<string | null>(null);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        {error && <ErrorBlock error={error} />}
        <View style={[s.f3, s.pv3, s.tc]}>
          <Input
            {...commonInputStyle}
            defaultValue={key}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            label="Key"
            placeholder="key..."
            onChangeText={(txt) => {
              setKey(txt);
            }}
            leftIcon={<Icon name="key" {...commonIconStyle} />}
          />
          <View>
            <Text style={[s.f6, s.pv2, s.pl2, s.b]}>Type:</Text>
          </View>
          <ButtonGroup
            onPress={(index) => setType(index)}
            containerStyle={[s.mv3]}
            selectedIndex={type}
            buttons={types}
          />

          {types[type] && types[type] === 'boolean' && (
            <View>
              <View>
                <Text style={[s.f6, s.pv2, s.pl2, s.b]}>Value:</Text>
              </View>
              <CheckBox
                title={'true'}
                checked={!!value}
                onPress={() => setValue(true)}
              />
              <CheckBox
                title={'false'}
                checked={value !== null && !value}
                onPress={() => setValue(false)}
              />
            </View>
          )}
          {types[type] && types[type] !== 'boolean' && (
            <Input
              {...commonInputStyle}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              label="Value"
              value={(value || '').toString()}
              placeholder="value..."
              onChangeText={(txt) => setValue(type === 2 ? parseInt(txt) : txt)}
              leftIcon={<Icon name="quote-right" {...commonIconStyle} />}
            />
          )}
          <Button
            title="Submit"
            containerStyle={[s.mv5]}
            onPress={() => {
              setError(null);
              if (!key) {
                setError('Key name not set.');
                return;
              } else if (value === null) {
                setError('Key value not set.');
                return;
              } else if (!types[type]) {
                setError('Key type not set.');
                return;
              } else if (types[type] !== typeof value) {
                setError('Key value does not match the type set.');
                return;
              }
              let indexIfFound = null;
              visitorContext.forEach((contextElement, i) => {
                if (contextElement.key === key) {
                  indexIfFound = i;
                }
              });

              // create context
              if (indexIfFound === null) {
                visitorContext.push({
                  key,
                  value,
                  type: types[type],
                });
              } else {
                // update context
                visitorContext[indexIfFound] = {
                  key,
                  value,
                  type: types[type],
                };
              }

              dispatch(setVisitorContextAction(visitorContext));
              navigation.navigate('SdkSettings');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(NewVisitorContext);
