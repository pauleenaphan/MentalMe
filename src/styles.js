import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

//style for the moobie model
export const moobie = StyleSheet.create({
  moobie_head:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: 125,
    left: -25
  },
  moobie_body:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 172,
    right: -40
  },
  moobie_feet:{
    position: 'absolute',
    width: 400,
    height: 310,
    bottom: 173,
    right: 22
  }
})


export const storeImgs = StyleSheet.create({
  item:{
    width: 200,
    height: 200
  }
})
