import React, { useState } from 'react';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Entypo } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EditExerciseModal from '../modals/EditExerciseModal';
import DeleteExerciseModal from '../modals/DeleteExerciseModal';

const ExerciseMenu = ({ exerciseId, exerciseName, editExercise, deleteExercise }) => {
  const [editExerciseModalVisible, setEditExerciseModalVisable] = useState(false);
  const [deleteExerciseModalVisible, setDeleteExerciseModalVisable] = useState(false);

  let menu = null;

  const setMenuRef = ref => {
    menu = ref;
  };

  const showMenu = () => {
    menu.show();
  };

  const showEditExerciseModal = () => {
    setEditExerciseModalVisable(true);
    return menu.hide();
  };

  const showDeleteExerciseModal = () => {
    setDeleteExerciseModalVisable(true);
    return menu.hide();
  };

  return (
    <>
      <EditExerciseModal
        isVisible={editExerciseModalVisible}
        setIsVisible={setEditExerciseModalVisable}
        id={exerciseId}
        name={exerciseName}
        editExercise={editExercise}
      />
      <DeleteExerciseModal
        isVisible={deleteExerciseModalVisible}
        setIsVisible={setDeleteExerciseModalVisable}
        id={exerciseId}
        name={exerciseName}
        deleteExercise={deleteExercise}
      />
      <Menu
        ref={setMenuRef}
        button={<Entypo size={wp('5%')} name="menu" onPress={showMenu} />}
      >
        <MenuItem onPress={showEditExerciseModal}>수정</MenuItem>
        <MenuItem onPress={showDeleteExerciseModal}>삭제</MenuItem>
      </Menu>
    </>
  );
}

export default ExerciseMenu;