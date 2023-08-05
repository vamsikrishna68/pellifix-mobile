import React from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import theme from '../../resources/theme';
import { WebView } from 'react-native-webview';
import style from './styles';
import { get as _get } from 'lodash';
import BottomSheet from '@gorhom/bottom-sheet';
import VideoPlayer from 'react-native-video-controls';
import { ActivityIndicator } from 'react-native';

const cross = require('./resources/clear.png');

class CometChatUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef(null);
    this.isLoading = true;
  }

  handleSheetChanges = (index) => {
    console.log('handleSheetChanges', index);
  };

  render() {
    return (
      <Modal
        transparent
        animated
        animationType="fade"
        visible={this.props.open}>
        <View style={style.outerContainer}>

          <BottomSheet
            ref={this.sheetRef}
            index={1}
            snapPoints={[Dimensions.get('window').height - 80, 0]}
            onChange={this.handleSheetChanges}
            enablePanDownToClose={true}
          >
            <View style={style.bottomSheetContainer}>
              <TouchableOpacity
                style={style.crossImgContainer}
                onPress={this.props.close}>
                <Image
                  source={cross}
                  style={style.crossImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={style.outerImageContainer}>
                {this.isLoading ? (
                  <View style={style.loaderContainer}>
                    <ActivityIndicator
                      size="large"
                      color={theme.color.primary}
                    />
                    <Text style={{ marginTop: 10 }}>Loading...</Text>
                  </View>
                ) : null}
                <View style={[style.mainContainer]}>
                  <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onError={(syntheticEvent) => {
                      const { nativeEvent } = syntheticEvent;
                      this.isLoading = false;
                      console.warn('WebView error: ', nativeEvent);
                    }}
                    onLoad={(syntheticEvent) => {
                      this.isLoading = false;
                    }}
                    onHttpError={(syntheticEvent) => {
                      const { nativeEvent } = syntheticEvent;
                      this.isLoading = false;
                      console.warn(
                        'WebView received error status code: ',
                        nativeEvent.statusCode,
                      );
                    }}
                    startInLoadingState={true}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderWidth: 3,
                    }}
                    source={{ uri: this.props.url }}
                    renderError={(errorName) => <Text>errorName</Text>}
                  />
                </View>
              </View>
            </View>
          </BottomSheet>
        </View>
      </Modal>
    );
  }
}
export default CometChatUserProfile;
