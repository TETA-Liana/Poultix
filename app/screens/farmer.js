import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Animated
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

// Simple icon components using just View elements
const BackIcon = () => (
  <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ 
      width: 12, 
      height: 12, 
      borderLeftWidth: 2, 
      borderBottomWidth: 2, 
      borderColor: '#334155', 
      transform: [{ rotate: '45deg' }] 
    }} />
  </View>
);

const MessageIcon = () => (
  <View style={{ width: 28, height: 28 }}>
    <View style={{ 
      width: 24, 
      height: 24, 
      borderRadius: 12, 
      borderWidth: 2, 
      borderColor: '#ef4444' 
    }} />
    <View style={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 8, 
      width: 10, 
      height: 10, 
      backgroundColor: '#ef4444', 
      transform: [{ rotate: '45deg' }] 
    }} />
  </View>
);

const MoreIcon = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#991b1b', marginHorizontal: 2 }} />
    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#991b1b', marginHorizontal: 2 }} />
    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#991b1b', marginHorizontal: 2 }} />
  </View>
);

const ArrowLeftIcon = ({ style }) => (
  <View style={[{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ 
      width: 12, 
      height: 12, 
      borderLeftWidth: 2, 
      borderBottomWidth: 2, 
      borderColor: '#334155', 
      transform: [{ rotate: '45deg' }] 
    }} />
  </View>
);

export default function App() {
  const [activeLocation, setActiveLocation] = useState('Byose');
  const scrollViewRef = useRef(null);
  const mainScrollViewRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const [cards, setCards] = useState([
    {
      id: '1',
      doctor: 'Dr. Patricia Uwimana',
      role: 'Doctor',
      date: 'Sunday, 27 June 2021',
      time: '08:00am - 10:00am',
      color: '#f59e0b',
    },
    {
      id: '2',
      doctor: 'Dr. Sarah Johnson',
      role: 'Specialist',
      date: 'Thursday, 1 July 2021',
      time: '08:00am - 09:00am',
      color: '#f59e0b',
    },
    {
      id: '3',
      doctor: 'Dr. Michael Chen',
      role: 'Surgeon',
      date: 'Monday, 5 July 2021',
      time: '10:00am - 11:30am',
      color: '#f59e0b',
    },
  ]);

  const scrollToCard = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * CARD_WIDTH, animated: true });
      setCurrentCardIndex(index);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / CARD_WIDTH);
    if (index !== currentCardIndex) {
      setCurrentCardIndex(index);
    }
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      scrollToCard(currentCardIndex - 1);
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      scrollToCard(currentCardIndex + 1);
    }
  };

  const handleMainScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const goBack = () => {
    // In a real app, this would navigate back
    alert('Going back to previous screen');
  };

  const scrollToSection = (sectionY) => {
    if (mainScrollViewRef.current) {
      mainScrollViewRef.current.scrollTo({ y: sectionY, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Status bar content */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <View style={styles.statusIcon} />
          <View style={styles.statusIcon} />
          <View style={styles.statusIcon} />
        </View>
      </View>
      
      {/* Back button and farmer avatar row */}
      <View style={styles.topRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={goBack}
          activeOpacity={0.7}
        >
          <BackIcon />
        </TouchableOpacity>
        
        {/* Farmer avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/64' }} 
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* Main scrollable content */}
      <Animated.ScrollView
        ref={mainScrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleMainScroll}
        scrollEventThrottle={16}
      >
        {/* User profile */}
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.profileName}>Umutoni Raissa</Text>
            <View style={styles.profileInfoContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.profileInfo}>Farmer- Female, 25</Text>
            </View>
          </View>
        </View>

        {/* Upcoming schedule */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming schedule</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Navigation controls */}
          <View style={styles.navigationControls}>
            <TouchableOpacity 
              onPress={goToPreviousCard}
              disabled={currentCardIndex === 0}
              style={[
                styles.navButton, 
                currentCardIndex === 0 && styles.navButtonDisabled
              ]}
            >
              <ArrowLeftIcon />
            </TouchableOpacity>
            
            <View style={styles.paginationDots}>
              {cards.map((_, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => scrollToCard(index)}
                  style={[
                    styles.paginationDot, 
                    currentCardIndex === index && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
            
            <TouchableOpacity 
              onPress={goToNextCard}
              disabled={currentCardIndex === cards.length - 1}
              style={[
                styles.navButton, 
                currentCardIndex === cards.length - 1 && styles.navButtonDisabled
              ]}
            >
              <ArrowLeftIcon style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
          </View>

          {/* Appointment cards */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{ paddingRight: 20 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {cards.map((card, index) => (
              <TouchableOpacity 
                key={card.id}
                activeOpacity={0.9}
                style={[
                  styles.appointmentCard, 
                  { 
                    backgroundColor: card.color, 
                    width: CARD_WIDTH,
                    transform: [{ scale: currentCardIndex === index ? 1 : 0.95 }]
                  }
                ]}
              >
                <View style={styles.doctorInfoContainer}>
                  <View style={[
                    styles.doctorAvatar, 
                    { borderColor: 'white' }
                  ]}>
                    <Image 
                      source={{ uri: 'https://via.placeholder.com/48' }} 
                      style={styles.doctorAvatarImage}
                    />
                  </View>
                  <View style={styles.doctorInfo}>
                    <Text style={[
                      styles.doctorName, 
                      { color: 'white' }
                    ]}>
                      {card.doctor}
                    </Text>
                    <Text style={{ color: '#fef3c7' }}>
                      {card.role}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreIcon />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.appointmentTimeContainer}>
                  <Text style={[
                    styles.appointmentDate, 
                    { color: 'white' }
                  ]}>
                    {card.date}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    {card.time}
                  </Text>
                </View>

                <View style={styles.messageIconContainer}>
                  <View style={styles.messageIconCircle}>
                    <MessageIcon />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Choose location */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose your location</Text>
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.locationTabsScrollContent}
          >
            {['Byose', 'Kibuye', 'Muhanga', 'Kigali', 'Gisenyi'].map((location) => (
              <TouchableOpacity
                key={location}
                onPress={() => setActiveLocation(location)}
                style={[
                  styles.locationTab,
                  activeLocation === location ? styles.locationTabActive : styles.locationTabInactive
                ]}
              >
                <Text
                  style={[
                    styles.locationTabText,
                    activeLocation === location ? styles.locationTabTextActive : styles.locationTabTextInactive
                  ]}
                >
                  {location}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Doctor listings */}
        <View style={styles.doctorListContainer}>
          {/* Doctor 1 */}
          <TouchableOpacity 
            style={styles.doctorListItem}
            activeOpacity={0.8}
          >
            <View style={styles.doctorListInfo}>
              <View style={styles.doctorListAvatar}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/48' }} 
                  style={styles.doctorListAvatarImage}
                />
              </View>
              <View style={styles.doctorListDetails}>
                <Text style={styles.doctorListName}>Dr. Mutesi Hadidja</Text>
                <Text style={styles.doctorListLocation}>Muhanga</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.doctorListMoreButton}>
              <MoreIcon />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Doctor 2 */}
          <TouchableOpacity 
            style={styles.doctorListItem}
            activeOpacity={0.8}
          >
            <View style={styles.doctorListInfo}>
              <View style={styles.doctorListAvatarContainer}>
                <View style={styles.doctorListAvatar}>
                  <Image 
                    source={{ uri: 'https://via.placeholder.com/48' }} 
                    style={styles.doctorListAvatarImage}
                  />
                </View>
                <View style={styles.doctorListNotificationDot} />
              </View>
              <View style={styles.doctorListDetails}>
                <Text style={styles.doctorListName}>Dr. Teta Liana</Text>
                <Text style={styles.doctorListLocation}>Nyamirambo</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.doctorListMoreButton}>
              <MoreIcon />
            </TouchableOpacity>
          </TouchableOpacity>
          
          {/* Doctor 3 */}
          <TouchableOpacity 
            style={styles.doctorListItem}
            activeOpacity={0.8}
          >
            <View style={styles.doctorListInfo}>
              <View style={styles.doctorListAvatar}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/48' }} 
                  style={styles.doctorListAvatarImage}
                />
              </View>
              <View style={styles.doctorListDetails}>
                <Text style={styles.doctorListName}>Dr. James Karemera</Text>
                <Text style={styles.doctorListLocation}>Kigali</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.doctorListMoreButton}>
              <MoreIcon />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Weekly report */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your weekly report</Text>
          
          <View style={styles.reportCard}>
            <View style={styles.reportContent}>
              <View style={styles.chartContainer}>
                <Text style={styles.chartLabel}>Feb</Text>
              </View>
              
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>Weekly Report</Text>
                <View style={styles.reportLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#fbbf24' }]} />
                    <Text style={styles.legendText}>Sick</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#f87171' }]} />
                    <Text style={styles.legendText}>At Risk</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Extra space at bottom for better scrolling */}
          <View style={{ height: 40 }} />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'black',
    borderRadius: 4,
    marginLeft: 4,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fce7f3', // Light pink background
    borderWidth: 4,
    borderColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
  },
  profileContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#334155',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34d399',
    marginRight: 8,
  },
  profileInfo: {
    color: '#9ca3af',
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#334155',
  },
  viewAllText: {
    color: '#dc2626',
    fontWeight: '500',
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  paginationDotActive: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  appointmentCard: {
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  doctorInfo: {
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  moreButton: {
    marginLeft: 'auto',
  },
  appointmentTimeContainer: {
    marginBottom: 16,
  },
  appointmentDate: {
    fontSize: 20,
    fontWeight: '600',
  },
  messageIconContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  messageIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#991b1b',
    marginBottom: 6,
  },
  locationTabsScrollContent: {
    paddingRight: 16,
  },
  locationTab: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
  },
  locationTabActive: {
    backgroundColor: '#b91c1c',
  },
  locationTabInactive: {
    backgroundColor: 'white',
  },
  locationTabText: {
    fontSize: 16,
  },
  locationTabTextActive: {
    color: 'white',
  },
  locationTabTextInactive: {
    color: '#6b7280',
  },
  doctorListContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 16,
  },
  doctorListItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  doctorListInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorListAvatarContainer: {
    position: 'relative',
  },
  doctorListAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorListAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  doctorListNotificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
  },
  doctorListDetails: {
    marginLeft: 12,
  },
  doctorListName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },
  doctorListLocation: {
    color: '#9ca3af',
  },
  doctorListMoreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reportContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 8,
    borderColor: '#e5e7eb',
    borderLeftColor: '#4ade80',
    borderTopColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
  },
  reportInfo: {
    marginLeft: 32,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 12,
  },
  reportLegend: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    color: '#9ca3af',
  },
});
