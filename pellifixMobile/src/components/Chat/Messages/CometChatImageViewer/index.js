import React from 'react';
import { View, Modal, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import style from './styles';
import { get as _get } from 'lodash';
import BottomSheet from '@gorhom/bottom-sheet';

const cross = require('./resources/clear.png');

class CometChatImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef(null);
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
        visible={this.props.open}
        onRequestClose={() => {
          this.sheetRef.current.snapTo(1);
          this.props.close();
        }} >
        <TouchableOpacity
          onPress={() => this.props.close()}
          style={style.outerContainer}>

          <BottomSheet
            ref={this.sheetRef}
            index={1}
            snapPoints={["25%", "50%", "90%"]}
            onChange={this.handleSheetChanges}
            enablePanDownToClose={true}
          >
            <TouchableWithoutFeedback>
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
                  <View style={[style.mainContainer]}>
                    <Image
                      source={{
                        uri: _get(this.props, 'message.data.url', ''),
                      }}
                      resizeMode="contain"
                      style={style.imageStyles}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </BottomSheet>
        </TouchableOpacity>
      </Modal>
    );
  }
}
export default CometChatImageViewer;
