import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
//#B6D3B3: used for background color of the pages
//#568258: used for button colors
//#81A282: used for journal entry 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

//style for loginpage
export const loginPage = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B6D3B3',
  },
  textInputContainer:{
    alignItems: 'flex-start',
    marginBottom: 30,
    padding: 20,
  },
  textInputLogin:{
    fontSize: 20,
    borderBottomWidth: 1,
    width: 250,
  },
  textInputCreate:{
    fontSize: 20,
    borderBottomWidth: 1,
    width: 250,
  },
  textContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    margin: 10,
  },
  title:{
    fontSize: 30,
    bottom: 15,
    backgroundColor: '#B6D3B3',
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: '#568258',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  icon:{
    marginLeft: -30,
    marginBottom: 10
  }
  
})

//style for homepage
export const homePage = StyleSheet.create({
  iconBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconBar:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightgreen',
    width: "100%",
    padding: 20,
    height: 80,
  },
  currency:{
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 70,
    left: 0,
    top: 0
  },
  background:{
    flex: 1,
    width: '100%',
    height: '100%',
  }
})

//style for honey coins
export const honeyCoin = StyleSheet.create({
  storePage:{
    width: 40,
    height: 40,
  }
});

//style for the moobie model
export const homePageMoobie = StyleSheet.create({
  moobie_head:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: 220,
    left: -25,
  },
  moobie_body:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 265,
    right: -40,
  },
  moobie_feet:{
    position: 'absolute',
    width: 400,
    height: 400,
    bottom: 129,
    right: 22,
  }
})

//style for moobie in the closet
export const closetPageMoobie = StyleSheet.create({
  moobie_head:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: -10,
    left: -25
  },
  moobie_body:{
    position: 'absolute',
    width: 500,
    height: 400,
    top: 38,
    right: -40
  },
  moobie_feet:{
    position: 'absolute',
    width: 400,
    height: 400,
    top: 141,
    right: 25
  }
})

//style for the clothe imgs
export const clothesImg = StyleSheet.create({
  store:{
    width: 200,
    height: 200
  },
  closet:{
    position: 'absolute',
    width: 200,
    height: 200
  }
})

export const closetContainer = StyleSheet.create({
  closet:{
    left: 120,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60
  },
})

//style for journal page
export const journalPage = StyleSheet.create({
  homePage:{
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  homePageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
    marginBottom: 100,
    
  },
  fullPageContainer:{
    flex: 1,
    backgroundColor: '#B6D3B3',
  },
  entry:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86AB86',
    borderRadius: 10,
    width: 320,
    padding: 20,
    marginTop: 15
  }
})

export const entryPage = StyleSheet.create({
  pageContainer:{
    flex: 1,
    backgroundColor: '#B6D3B3',
  },
  headerContainer:{
    marginTop: 120, 
    marginLeft: 40, 
    marginRight: 40, 
    marginBottom: 50
  },
  title:{
    fontSize: 30, 
    fontWeight: 'bold', 
    maxWidth: '100%', 
    textAlign: 'left'
  },
  description:{
    marginLeft: 40, 
    marginRight: 40, 
    fontSize: 20, 
    backgroundColor: '#81A282', 
    height: 500, 
    padding: 20
  }
})

export const newEntryPage = StyleSheet.create({
  pageContainer:{
    flex: 1,
    backgroundColor: '#B6D3B3',
  },
  titleDescContainer:{
    alignItems: 'center', 
    marginTop: 150, 
    marginLeft: 40, 
    marginRight: 40
  },
  title:{
    fontSize: 30, 
    maxWidth: '100%', 
    marginBottom: 30,
    fontWeight: 'bold'
  },
  descriptionContainer:{
    height: 500, 
    width: 300, 
    padding: 20, 
    borderWidth: 3, 
    borderColor: '#568258', 
    borderRadius: 10
  },
  description:{
    flex: 1, 
    fontSize: 20
  }
})


