import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EditExerciseModal from '../modals/EditExerciseModal';

const MaterialMenu = ({ exerciseId, exerciseName }) => {
  const [editExerciseModalVisible, setEditExerciseModalVisable] = useState(false);

  let menu = null;

  const setMenuRef = ref => {
    menu = ref;
  };

  const showMenu = () => {
    menu.show();
  };

  const edit = () => {
    setEditExerciseModalVisable(true);
    return menu.hide();
  };

  return (
    <View>
      <EditExerciseModal
        isVisible={editExerciseModalVisible}
        setIsVisible={setEditExerciseModalVisable}
        id={exerciseId}
        name={exerciseName}
      />
      <Menu
        ref={setMenuRef}
        button={<Entypo size={wp('5%')} name="menu" onPress={showMenu} />}
      >
        <MenuItem onPress={edit}>수정</MenuItem>
        <MenuItem onPress={() => {}}>삭제</MenuItem>
      </Menu>
    </View>
  );
}

export default MaterialMenu;