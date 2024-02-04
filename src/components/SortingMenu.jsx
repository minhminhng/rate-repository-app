import { Picker } from '@react-native-picker/picker';

const options = [
  'Latest repositories',
  'Highest rated repositories',
  'Lowest rated repositories'
]

const SortingMenu = ({ setOrder, setDirection, setOption, option }) => {
  const changeSorting = (itemValue, itemIndex) => {
    setOption(itemValue);
    if (itemIndex === 2) {
      setOrder('RATING_AVERAGE');
      setDirection('DESC');
    }
    else if (itemIndex === 3) {
      setOrder('RATING_AVERAGE');
      setDirection('ASC');
    }
    else {
      setOrder('CREATED_AT');
      setDirection('DESC');
    }
  }

  return (
    <Picker
      selectedValue={option}
      onValueChange={(itemValue, itemIndex) =>
      changeSorting(itemValue, itemIndex)}>
        <Picker.Item label="Select an item..." value="Select an item..." enabled={false} style={{color: 'grey'}}/>
      {
        options.map(option => <Picker.Item key={option} label={option} value={option} />)
      }
    </Picker>
  );
};

export default SortingMenu;