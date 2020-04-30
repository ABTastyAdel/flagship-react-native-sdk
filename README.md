# Flagship - React Native Sdk

React Native Flagship SDK provides a `<RNFlagshipProvider/>`, which makes Flagship features available to your apps (ios/android)
Flagship features are accessible using Flagship hooks, have a look to the documentation for details.

### Prerequisites

-   **Node.js**: version 6.0.0 or later...

-   **Npm**: version 5.2.0 or later...

-   **React**: version 16.8.0 or later... (This SDK supports only hooks for now)

 
## Getting Started

1. **Install** the node module:

```js

/// Install flagship-react-native-sdk package 
npm install "flagship-react-native-sdk"
```

2. **Import** the Flagship React provider at the root level of your app like `App.js` file 


3. **Initialize** the provider with at least required props such as `envId`, `visitorData` :

```js

/// Import the  flagship provider from package
import ReactNativeFlagshipProvider from 'flagship-react-native-sdk'



const App = createAppContainer(navigator);

export default () => {
  return (
    <ReactNativeFlagshipProvider
      envId="your envId"
      config={{
        fetchNow: true,
        enableConsoleLogs: true,
        nodeEnv: 'development'
      }}
       onInitStart={() => {

         // Callback called on start the Flagship
       }}
       onInitDone={() => {

        // Callback called when the init is done
       }}
      onError = { ()=>{

        // if something goes wrong with your envId, this Error call back will be called
      }}
      visitorData={{
        id: "visitorId",
        context: {"isVip":true},  /// (keys/values) to define the context
      }}

      loadingComponent={}
      >
      <App/>
      </ReactNativeFlagshipProvider>
  );
};
```

4. Use a Flagship hook in a component.

```js
import React  from 'react';
import {View, Text} from 'react-native';
import { RNuseFsModifications } from 'flagship-react-native-sdk'

export const MyReactNativeComponent = () => {


///
    const fsModifications = RNuseFsModifications([
    {
      key: "backGroundColor",
      defaultValue: "yellow",
      activate: true,
    }
  ]);


    /// Set the backgroud color by using the fsModifications 
    return (<View backgroundColor = {fsModifications.RNBackGroundColor}/>);
};
```

## RNFlagshipProvider Props

This is all available props which you can use inside the `RNFlagshipProvider` react component:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Props</th>
        <th style="width: 50px;">Type</th>
        <th style="width: 50px;">Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>envId</td>
          <td>string</td>
          <td>*required*</td>
          <td>Your Flagship environment id.</td>
        </tr>
         <tr>
          <td>visitorData</td>
          <td>object</td>
          <td>*required*</td>
          <td>This is the data to identify the current visitor using your app.<br>The visitorData object takes the following attributes:
           <table> 
              <tbody><tr>
                  <th style="width:25%">Argument</th>
                  <th style="width:10%">Type</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>id</em></td>
                  <td><em>string</em></td>
                  <td>Required. The id of the visitor</td>
                </tr>
                <tr>
                  <td><em>context</em></td>
                  <td><em>object</em></td>
                  <td>Optional. Your Flagship visitor context.<br>You'll set inside attributes which should match those defined in your campaigns.
                  </td>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>config</td>
          <td>object</td>
          <td>{}</td>
          <td>This is the settings of the SDK. It takes an object, the shape is describe <a href='README.md#sdk-prop-settings'>here</a>.</td>
        </tr>
        <tr>
          <td>onInitStart</td>
          <td>function():void</td>
          <td>null</td>
          <td>Callback function called when the SDK starts initialization.</td>
        </tr>
        <tr>
          <td>onInitDone</td>
          <td>function():void</td>
          <td>null</td>
          <td>Callback function called when the SDK ends initialization.</td>
        </tr>
        <tr>
          <td>onError</td>
          <td>function():void</td>
          <td>null</td>
          <td>Callback function called when an error occurred.</td>
        </tr>
        <tr>
          <td>onUpdate</td>
          <td>function(object):void</td>
          <td>null</td>
          <td>Callback function called when the SDK is updated. For example, after a synchronize is triggered or visitor context has changed.<br>It has one argument which is an object with has the following shape: <table> 
              <tbody><tr>
                  <th style="width:25%">Key/Property</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>fsModifications</em></td>
                  <td>It contains the last modifications saved in cache.
                  </td>
                </tr>
              </tbody>
            </table></td>
        </tr>
        <tr>
          <td>initialModifications</td>
          <td>object</td>
          <td>null</td>
          <td>This is an object which has the shape of Flagship modifications as it is return from the Flagship API.<br>Can be useful when you already manually fetched the data before or you have your own cache.<br>Providing this prop avoid the SDK to have an empty cache during first initialization.<br>The default modifications provided will be overridden whenever the SDK is fetching Flagship API in order to modifications up to date.<br>You can save back the last updated modifications using <i>onUpdate</i> prop callback.</td>
        </tr>
        <tr>
          <td>loadingComponent</td>
          <td>React.ReactNode</td>
          <td>undefined</td>
          <td>This is component which will be render when Flagship is loading on <b>first initialization</b> only.<br>By default, the value is <i>undefined</i> which means it will display your app and it might display default modifications value for a very short moment.</td>
        </tr>
    </tbody>
</table>

## SDK Prop Settings

This is all available settings which you can set on the SDK.

Here are the attributes which you can set inside the SDK settings object:

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Argument</th>
        <th style="width: 50px;">Type</th>
        <th style="width: 50px;">Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>fetchNow</td>
          <td>boolean</td>
          <td>false</td>
          <td>Decide to fetch automatically modifications data when creating a new <a href='README.md#flagshipvisitor-class'>FlagshipVisitor</a>.</td>
        </tr>
        <tr>
          <td>activateNow</td>
          <td>boolean</td>
          <td>false</td>
          <td>Decide to trigger automatically the data when creating a new <a href='README.md#flagshipvisitor-class'>FlagshipVisitor</a>.<br>NOTE: when set to <i>true</i>, it will implicitly set <i>fetchNow=true</i> as well.</td>
        </tr>
        <tr>
          <td>enableConsoleLogs</td>
          <td>boolean</td>
          <td>false</td>
          <td>Enable it to display logs on the console when SDK is running.<br>This will only display logs such as <i>Warnings</i>, <i>Errors</i>, <i>Fatal errors</i> and <i>Info</i>.</td>
        </tr>
        <tr>
          <td>logPathName</td>
          <td>string</td>
          <td>'flagshipNodeSdkLogs'</td>
          <td>This is the path where logs will be written when SDK is running.<br>By default it will create a folder named <i>flagshipNodeSdkLogs</i> at the root of your project</a>.</td>
        </tr>
        <tr>
          <td>enableErrorLayout</td>
          <td>boolean</td>
          <td>false</td>
          <td>This is a small layout visible at the bottom of the screen. It is displayed only when an unexpected error occurred in the SDK. By default, it's set to <i>false</i> and if set to <i>true</i>, it will be only visible in a node environment other than <i>production</i>. Here a <a href='./src/assets/img/errorLayout.png'>screenshot</a> to have a look.</td>
        </tr>
        <tr>
          <td>nodeEnv</td>
          <td>string</td>
          <td>'production'</td>
          <td>If value is other than <i>production</i>, it will also display <i>Debug</i> logs.</td>
        </tr>
        <tr>
          <td>flagshipApi</td>
          <td>string</td>
          <td>'https://decision-api.flagship.io/v1/'</td>
          <td>
          This setting can be useful in further scenario:<br>
          - If you need to mock the API for tests such as end to end.<br>
          - If you want to move to an earlier version the Flagship API (v2, v3,...).
          </td>
        </tr>
</tbody>

</table>

## Flagship Hooks

Here the list of current available hooks:

-   [RNuseFlagship](#RNuseFlagship)
-   [RNuseFsModifications](#RNuseFsModifications)
-   [RNuseFsActivate](#RNuseFsActivate)
-   [RNuseFsSynchronize](#RNuseFsSynchronize)

### Available hits

-   [Transaction Hit](#transaction-hit)
-   [Screen Hit](#screen-hit)
-   [Item Hit](#item-hit)
-   [Event Hit](#event-hit)

### RNuseFlagship

Most used hook from the Flagship React Native SDK. Through this hook, you can access to modifications of your current visitor and have an access to the SDK status. Output shape is visible [here](#useFlagship-output-shape).

> returns an object (Typescript: UseFlagshipOutput)

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Argument</th>
        <th style="width: 50px;">Type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>options</td>
          <td>object (TS:UseFlagshipParams)</td>
          <td>See the shape of options param,  <a href='README.md#useFlagship-options'>just below</a>.</td>
        </tr>
    </tbody>
</table>

#### `RNuseFlagship options`

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Key/Property</th>
        <th style="width: 50px;">Type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>modifications</td>
          <td>object</td>
          <td>Node param to specify flagship modifications:
            <table> 
              <tbody><tr>
                  <th style="width:25%">Argument</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>requested</em></td>
                  <td>Required. An array of object for each modifications and follow this shape:
                   <table> 
              <tbody><tr>
                  <th style="width:25%">Argument</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>key</em></td>
                  <td>Required. The name of the modification.</td>
                </tr>
                <tr>
                  <td><em>defaultValue</em></td>
                  <td>Required. The default value if no value for this modification is found.</td>
                </tr>
                  <tr>
                  <td><em>activate</em></td>
                  <td>Optional. </td>
                </tr>
              </tbody>
            </table>
                  </td>
                </tr>
                  <tr>
                  <td><em>activateAll</em></td>
                  <td>Optional. The value is <i>false</i> by default</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
    </tbody>
</table>

##### `RNuseFlagship output shape`

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Key/Property</th>
        <th style="width: 50px;">Type</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>modifications</td>
          <td>object</td>
          <td>An <i>object</i> where each key is a modification with corresponding value
          </td>
        </tr>
        <tr>
          <td>hit</td>
          <td>object</td>
             <td>Gives you some functions to send one or further hits:
          <table> 
              <tbody><tr>
                  <th style="width:25%">Key/Property</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>send</em></td>
                  <td>Takes an object as parameter. The object must follow a <a href='#Shape-of-possible-hits-to-send'>hit shape</a>.
            </td>
                </tr>
                <tr>
                  <td><em>sendMultiple</em></td>
                <td>Takes an array of object as parameter. Each object must follow a <a href='#Shape-of-possible-hits-to-send'>hit shape</a>. You can mix different hit shape within the array.
         </tr>
                  <tr>
                </tr>
              </tbody>
            </table> </td>
        </tr>
        <tr>
          <td>status</td>
          <td>object</td>
            <td>Gives you some informations about SDK current sate:
          <table> 
              <tbody><tr>
                  <th style="width:25%">Key/Property</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>isLoading</em></td>
                  <td>If true, the SDK it not ready, false otherwise.
            </td>
                </tr>
                <tr>
                  <td><em>lastRefresh</em></td>
                  <td>Date cast string with ISO format.<br>This is the date corresponding to the most recent moment where modifications were saved in cache.</td>
                </tr>
                  <tr>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
    </tbody>
</table>


### RNuseFsModifications

This will give you the modification saved in the SDK cache.

**NOTE:** If the SDK cache is empty, you can expect that it will return nothing.

returns Flagship modifications

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Argument</th>
        <th style="width: 50px;">Type</th>
        <th style="width: 50px;">Default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>modificationsRequested</td>
          <td>Array(object)</td>
          <td>*required*</td>
          <td>List of all modifications you're looking for. Each element of the array follow this object structure:
            <table> 
              <tbody><tr>
                  <th style="width:25%">Argument</th>
                  <th>Description</th>
                </tr>  
                <tr>
                  <td><em>key</em></td>
                  <td>Required. The name of the modification.</td>
                </tr>
                <tr>
                  <td><em>defaultValue</em></td>
                  <td>Required. The default value if no value for this modification is found.</td>
                </tr>
                  <tr>
                  <td><em>activate</em></td>
                  <td>Optional. </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>activateAllModifications</td>
          <td>boolean</td>
          <td>false</td>
          <td>If set to true, all modifications will be activated. If set to false, none will be activated.
          <br>Be aware that if this argument is set, the attribute <i>activate</i> set in each element of array <b>modificationsRequested</b> will be ignored.</td>
        </tr>
    </tbody>
</table>



### RNuseFsActivate

return `void`

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Argument</th>
        <th style="width: 50px;">Type</th>
        <th style="width: 50px;">Default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>modificationKeys</td>
          <td>Array(string)</td>
          <td>*required*</td>
          <td>An array of modification key.<br>For each key, a http will be done to trigger the activate of corresponding modification.</td>
        </tr>
         <tr>
          <td>applyEffectScope</td>
          <td>Array(string)</td>
          <td>[]</td>
          <td>This argument has same behavior as React.useEffect (2nd argument) hook. It will listen values inside array and trigger a synchronize if one them has changed. By default it is trigger once, during React component where it's used, did mount.</td>
        </tr>
    </tbody>
</table>


```JSX

/// Hooks to activate manualy , RNBackGroundColor is the modificationKey

RNuseFsActivate(["RNBackGroundColor"]);

```

### RNuseFsSynchronize

Refresh modifications in cache by making a http request to the Flagship API.

return `void`

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Argument</th>
        <th style="width: 50px;">Type</th>
        <th style="width: 50px;">Default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>applyEffectScope</td>
          <td>Array(string)</td>
          <td>[]</td>
          <td>This argument has same behavior as React.useEffect (2nd argument) hook. It will listen values inside array and trigger a synchronize if one them has changed. By default it is trigger once, during React component where it's used, did mount.</td>
        </tr>
         <tr>
          <td>activateAllModifications</td>
          <td>Boolean</td>
          <td>false</td>
          <td>If set to true, all modifications will be activated. If set to false (default behavior), none will be activated.</td>
        </tr>
    </tbody>
</table>
 

### <i>Shape</i> of possible hits to send

-   [Transaction Hit](#transaction-hit)
-   [Screen Hit](#screen-hit)
-   [Item Hit](#item-hit)
-   [Event Hit](#event-hit)

#### `Transaction Hit`

```Js

import { RNuseFlagship} from 'flagship-react-native-sdk';

const { hit: fsHit } = RNuseFlagship();

/// Transaction hit
const transactionHit = {
    type: 'Transaction',
    data: {
      transactionId: '101010101',
      affiliation: 'RN_affiliation',
      totalRevenue: 999,
      shippingCost: 888,
      shippingMethod: 'CB',
      currency: '784',
      taxes: 1234444,
      paymentMethod: 'payPal',
      itemCount: 2,
      couponCode: 'myCOUPON',
      documentLocation: "APP",
      pageTitle: 'myScreen'
    }
  };

/// Send the transaction hit 
fsHit.send(transactionHit);

```


<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Attribute</th>
        <th style="width: 50px;">Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>transactionId</td>
          <td>string</td>
          <td>Required. The id of your transaction.</td>
        </tr>
        <tr>
          <td>affiliation</td>
          <td>string</td>
          <td>Required. The name of the KPI that you will have inside your reporting.</td>
        </tr>
        <tr>
          <td>totalRevenue</td>
          <td>number</td>
          <td>Optional. Specifies the total revenue associated with the transaction. This value should include any shipping or tax costs.</td>
        </tr>
        <tr>
          <td>shippingCost</td>
          <td>number</td>
          <td>Optional. The total shipping cost of your transaction.</td>
        </tr>
        <tr>
          <td>shippingMethod</td>
          <td>string</td>
          <td>Optional. The shipping method of your transaction.</td>
        </tr>
        <tr>
          <td>taxes</td>
          <td>number</td>
          <td>Optional. Specifies the total tax of your transaction.</td>
        </tr>
        <tr>
          <td>currency</td>
          <td>string</td>
          <td>Optional. Specifies the currency of your transaction.<br>NOTE: Value should be a valid ISO 4217 currency code.</td>
        </tr>
        <tr>
          <td>paymentMethod</td>
          <td>string</td>
          <td>Optional. Specifies the payment method used for your transaction.</td>
        </tr>
        <tr>
          <td>itemCount</td>
          <td>number</td>
          <td>Optional. Specifies the number of item of your transaction.</td>
        </tr>
        <tr>
          <td>couponCode</td>
          <td>string</td>
          <td>Optional. The coupon code associated with the transaction.</td>
        </tr>
        <tr>
          <td>documentLocation</td>
          <td>string</td>
          <td>Optional. Specifies the current URL of the page, at the moment where the hit has been sent.</td>
        </tr>
        <tr>
          <td>pageTitle</td>
          <td>string</td>
          <td>Optional. Specifies the name of the page, at the moment where the hit has been sent.</td>
        </tr>
    </tbody>
</table>

#### `Screen Hit`

```Js

/// Send Screen Hit
import { RNuseFlagship} from 'flagship-react-native-sdk';

const { hit: fsHit } = RNuseFlagship();

/// Screen hit
  const screenHit = {
    type: 'Screen',
    data: {
      documentLocation: "APP",  /// For the Mobile,  documentLocation = APP
      pageTitle: "blogpost"
    }
  };

//send the screen hit 
fsHit.send(screenHit);

```



<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Attribute</th>
        <th style="width: 50px;">Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>documentLocation</td>
          <td>string</td>
          <td>Required. Specifies the current URL of the page, at the moment where the hit has been sent.</td>
        </tr>
        <tr>
          <td>pageTitle</td>
          <td>string</td>
          <td>Required. Specifies the name of the page, at the moment where the hit has been sent.</td>
        </tr>
    </tbody>
</table>

#### `Item Hit`


```js

/// Send Item Hit
import { RNuseFlagship} from 'flagship-react-native-sdk';

const { hit: fsHit } = RNuseFlagship();

const itemHit = {
    type: 'Item',
    data: {
      transactionId: '0987654321',
      name: 'RN_item',
      price: 100,
      code: 'code',
      category: 'category',
      quantity: 123,
      documentLocation: "APP"
    }
  };

fsHit.send(itemHit);
```

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Attribute</th>
        <th style="width: 50px;">Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>transactionId</td>
          <td>string</td>
          <td>Required. The id of your transaction.</td>
        </tr>
        <tr>
          <td>name</td>
          <td>string</td>
          <td>Required. The name of your item.</td>
        </tr>
        <tr>
          <td>price</td>
          <td>number</td>
          <td>Optional. Specifies the price for a single item / unit.</td>
        </tr>
        <tr>
          <td>code</td>
          <td>string</td>
          <td>Optional. Specifies the SKU or item code.</td>
        </tr>
        <tr>
          <td>category</td>
          <td>string</td>
          <td>Optional. Specifies the category that the item belongs to.
          </td>
        </tr>
        <tr>
          <td>quantity</td>
          <td>number</td>
          <td>Optional. Specifies the number of items purchased.
          </td>
        </tr>
        <tr>
          <td>documentLocation</td>
          <td>string</td>
          <td>Optional. Specifies the current URL of the page, at the moment where the hit has been sent.</td>
        </tr>
        <tr>
          <td>pageTitle</td>
          <td>string</td>
          <td>Optional. Specifies the name of the page, at the moment where the hit has been sent.</td>
        </tr>
    </tbody>
</table>

#### `Event Hit`

```js 
/// Send Event

  const { hit: fsHit } = RNuseFlagship();

  const eventHit = {

    type: 'Event',
    data: {
      category: 'User Engagement',
      action: 'RN_Onclick',
      label: 'Hello from React Native',
      value: 123,
      documentLocation: "APP"
    }
    fsHit.send(eventHit);


```
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Attribute</th>
        <th style="width: 50px;">Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>category</td>
          <td>string</td>
          <td>Required. Specifies the category of your event.<br>NOTE: The value must be either <b>Action Tracking</b> or <b>User Engagement</b>.</td>
        </tr>
        <tr>
          <td>action</td>
          <td>string</td>
          <td>Required. The name of the KPI you will have inside the reporting.</td>
        </tr>
        <tr>
          <td>label</td>
          <td>string</td>
          <td>Optional. Specifies additional description of your event.</td>
        </tr>
        <tr>
          <td>value</td>
          <td>number</td>
          <td>Optional. Specifies how much you won with that event.<br>For example, depending on the lead generated, you will earn 10 to 100 euros. Adding that value will enable us to do a sum inside the reporting and give you the average value too.<br>NOTE: Value must be non-negative.</td>
        </tr>
        <tr>
          <td>documentLocation</td>
          <td>string</td>
          <td>Optional. Specifies the current URL of the page, at the moment where the hit has been sent.</td>
        </tr>
        <tr>
          <td>pageTitle</td>
          <td>string</td>
          <td>Optional. Specifies the name of the page, at the moment where the hit has been sent.</td>
        </tr>
    </tbody>
</table>



## Release

Current version 0.1.0