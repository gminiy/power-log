import React from 'react';
import { View } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ExerciseMenu = ({ setDeleteModalVisable, setEditModalVisable }) => {
  let menu = null;

  const setMenuRef = ref => {
    menu = ref;
  };

  const showMenu = () => {
    menu.show();
  };

  const showEditExerciseModal = () => {
    setEditModalVisable(true);
    return menu.hide();
  };

  const showDeleteExerciseModal = () => {
    setDeleteModalVisable(true);
    return menu.hide();
  };

  return (
    <Menu
      ref={setMenuRef}
      button={<MaterialCommunityIcons size={wp('8%')} name="menu" onPress={showMenu} />}
    >
      <MenuItem onPress={showEditExerciseModal}>수정</MenuItem>
      <MenuItem onPress={showDeleteExerciseModal}>삭제</MenuItem>
    </Menu>
  );
}

export default ExerciseMenu;