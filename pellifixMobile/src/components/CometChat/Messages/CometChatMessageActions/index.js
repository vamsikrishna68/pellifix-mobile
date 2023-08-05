import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import style from './styles';
import Actions from './actions';
import BottomSheet from '@gorhom/bottom-sheet';

export default class CometChatMessageActions extends React.Component {
  sheetRef = React.createRef(null);

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.sheetRef.current.snapTo(0);
    }
  }

  renderContent = () => (
    <Actions {...this.props} message={this.props.message} />
  );

  renderHeader = () => <View style={style.header} />;

  handleSheetChanges = (index) => {
    console.log('handleSheetChanges', index);
  };

  render() {
    const { open, close } = this.props;
    return (
      <Modal transparent animated animationType="fade" visible={open}>
        <View style={style.bottomSheetContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.sheetRef.current.snapTo(1);
              this.props.close();
            }}>
            <View style={style.fullFlex}>
            <BottomSheet
                ref={this.sheetRef}
                index={1}
                snapPoints={["25%", "50%", "90%"]}
                onChange={this.handleSheetChanges}
                enablePanDownToClose={true}
              >
                {this.renderContent}
              </BottomSheet>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
