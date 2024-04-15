import React, { useState } from 'react';
import { Button, View } from 'react-native';
import Tabs from './BottomTabs'
import Navigation from './Navigation'

function Type() {
    const [navType, setNavType] = useState(null);
  
    if (navType === 'tabs') {
      return <Tabs />;
    } else if (navType === 'drawer') {
      return <Navigation />;
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Utiliser la navigation par onglets" onPress={() => setNavType('tabs')} />
          <Button title="Utiliser la navigation par tiroir" onPress={() => setNavType('drawer')} />
        </View>
      );
    }
  }
  export default Type;