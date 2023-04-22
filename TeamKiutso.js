import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

class Leaderlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: [],
      intakeYears: [],
      selectedIntakeYear: null,
    };
  }

  componentDidMount() {
    fetch('http://192.168.255.85:80/apis/get_leaders.php')
      .then(response => response.json())
      .then(data => {
        const intakeYears = Array.from(new Set(data.map(leader => leader.intake_year)));
        this.setState({ leaders: data, intakeYears, selectedIntakeYear: intakeYears[0] });
      })
      .catch(error => console.log(error));
  }

  handleIntakeYearPress = intakeYear => {
    this.setState({ selectedIntakeYear: intakeYear });
  }

  handleLeaderPress = leader => {
    const updatedLeaders = this.state.leaders.map(l => {
      if (l.id === leader.id) {
        return { ...l, showBiography: !l.showBiography };
      } else {
        return l;
      }
    });
    this.setState({ leaders: updatedLeaders });
  }

  render() {
    const { leaders, intakeYears, selectedIntakeYear } = this.state;
    const selectedLeaders = leaders.filter(leader => leader.intake_year === selectedIntakeYear);
    
    return (
      
      <View style={styles.container}>
         <View style={{ height: 10 }} />
        <View style={styles.buttonContainer}>
          {intakeYears.map(intakeYear => (
            <TouchableOpacity
              key={intakeYear}
              onPress={() => this.handleIntakeYearPress(intakeYear)}
              style={[styles.arrayButton, selectedIntakeYear === intakeYear && styles.selectedArrayButton]}
            >
              <Text style={[styles.arrayButtonText, selectedIntakeYear === intakeYear && styles.selectedArrayButtonText]}>
                {intakeYear}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView>
        <Text   style={styles.leaderPosition}>CLICK IMAGE TO SEE BIOGRAPH</Text>
        <View style={{ height: 10 }} />
          {selectedLeaders.map(leader => (
           
            <TouchableOpacity
              key={leader.id}
              style={styles.leaderCard}
              onPress={() => this.handleLeaderPress(leader)}
            >
              <Image
                source={{ uri: `http://192.168.255.85:80/apis/${leader.image}` }}
                style={styles.leaderImage}
              />
              <Text style={styles.leaderName}>{leader.name}</Text>
              <Text style={styles.leaderPosition}>{leader.position}</Text>
              <Text style={styles.leaderContact}>{leader.phone} - {leader.email}</Text>
              {leader.showBiography && <Text style={styles.leaderBiography}>{leader.biography}</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,


    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#eee'
  },
  arrayButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#eee',

  },
  selectedArrayButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    padding: 10,
  },
  arrayButtonText: {
    fontWeight: 'bold',
    color: '#999',
    
  },
  selectedArrayButtonText: {
    color: '#fff',
    
  },
  leaderCard: {
    flexDirection: 'column',padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: 'center',
    },
    leaderImage: {
    width: 300,
    height: 300,
    borderRadius: 30,
    marginBottom: 10,
    },
    leaderName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    },
    leaderPosition: {
    fontStyle: 'italic',
    marginBottom: 5,
    fontSize: 15,
    color: '#4CAF50',
    },
    leaderContact: {
    marginBottom: 5,
    },
    leaderBiography: {
    marginTop: 10,
    textAlign: 'center',
    },
    };
    
    export default Leaderlist;
    
    
    
    
    
   
