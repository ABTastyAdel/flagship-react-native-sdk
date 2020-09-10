import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {Badge, Button, Input} from 'react-native-elements';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootStackParamList} from 'src/components/QaSandbox/stackContainer';
import {RootState} from 'src/redux/rootReducer';

import {commonIconStyle, commonInputStyle} from './../..';
import commonStyles, {appColors} from './../../../../../../assets/commonStyles';

const styles = StyleSheet.create({
  customRow: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  customButtonDelete: {
    marginTop: 6,
    marginBottom: 6,
  },
});

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SdkSettings'
>;

interface Props {
  visitorId: string | undefined;
  visitorContext: [{[key: string]: any}];
  onChangeVisId: (text: string) => void;
  onContextDelete: (index: number) => void;
  navigation: ScreenNavigationProp;
}

const VisitorSettings: React.SFC<Props> = ({
  visitorId,
  onChangeVisId,
  onContextDelete,
  visitorContext,
  // onContextUpdate,
  navigation,
}) => {
  const BoolBadge = () => (
    <Badge value="Bool" status="success" containerStyle={styles.customRow} />
  );
  const NumberBadge = () => (
    <Badge value="Number" status="error" containerStyle={styles.customRow} />
  );
  const StringBadge = () => (
    <Badge value="String" status="warning" containerStyle={styles.customRow} />
  );
  return (
    <View style={[s.mv3]}>
      <Input
        {...commonInputStyle}
        label="Visitor ID"
        placeholder="Your visitor ID"
        autoCorrect={false}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        value={visitorId}
        onChangeText={onChangeVisId}
        leftIconContainerStyle={[s.mr3]}
        leftIcon={<Icon name="user" {...commonIconStyle} />}
      />
      <Text style={[s.mt3, s.mh2, s.b, commonStyles.label]}>
        Visitor Context
      </Text>
      <Button
        containerStyle={[s.mv2]}
        buttonStyle={[{backgroundColor: appColors.dark}]}
        title="Add a visitor context"
        icon={<Icon name="plus" size={15} color="white" style={[s.mh2]} />}
        onPress={() => {
          navigation.navigate('NewVisitorContext');
        }}
      />
      <Grid>
        <Col size={2}>
          {visitorContext.map((context, index) => {
            switch (context.type) {
              case 'bool':
              case 'boolean':
                return <BoolBadge key={context.type + index} />;
              case 'string':
                return <StringBadge key={context.type + index} />;
              case 'number':
                return <NumberBadge key={context.type + index} />;
              default:
                return null;
            }
          })}
        </Col>
        <Col size={7}>
          {visitorContext.map((context, index) => {
            switch (context.type) {
              case 'bool':
              case 'boolean':
                return (
                  <View
                    key={context.value.toString() + index}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={[s.mh2]}>{context.key}:</Text>
                    <Text style={{color: appColors.grey}}>
                      {context.value.toString()}
                    </Text>
                  </View>
                );
              case 'string':
                return (
                  <View
                    key={context.value.toString()}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={[s.mh2]}>{context.key}:</Text>
                    <Text style={{color: appColors.grey}}>{context.value}</Text>
                  </View>
                );
              case 'number':
                return (
                  <View
                    key={context.value.toString()}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={[s.mh2]}>{context.key}:</Text>
                    <Text style={{color: appColors.grey}}>{context.value}</Text>
                  </View>
                );
              default:
                return null;
            }
          })}
        </Col>

        <Col size={3}>
          {visitorContext.map((context, index) => {
            return (
              <View
                style={[s.flex, {flexDirection: 'row'}]}
                key={index + index + index}>
                <Button
                  icon={<Icon name="edit" size={12} color="white" />}
                  buttonStyle={[
                    {backgroundColor: appColors.blue, width: 40},
                    s.mr2,
                  ]}
                  title=""
                  onPress={() => {
                    navigation.navigate('NewVisitorContext', {...context});
                  }}
                  containerStyle={styles.customButtonDelete}
                />
                <Button
                  icon={<Icon name="times" size={12} color="white" />}
                  buttonStyle={[{backgroundColor: appColors.red, width: 40}]}
                  title=""
                  onPress={() => onContextDelete(index)}
                  containerStyle={styles.customButtonDelete}
                />
              </View>
            );
          })}
        </Col>
      </Grid>
      <View />
    </View>
  );
};

export default NativeTachyons.wrap(VisitorSettings);
