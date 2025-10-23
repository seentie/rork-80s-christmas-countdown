import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/retroColors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOVIE_FACTS = [
  // 1940s
  { fact: "It's a Wonderful Life (1946) was a box office flop but became a classic when its copyright expired in 1974", decade: "1940s" },
  { fact: "Miracle on 34th Street (1947) won 3 Academy Awards including Best Supporting Actor", decade: "1940s" },
  
  // 1950s
  { fact: "White Christmas (1954) was the first movie filmed in VistaVision and the highest-grossing film of 1954", decade: "1950s" },
  
  // 1960s
  { fact: "A Charlie Brown Christmas (1965) was made for just $76,000 and almost didn't air due to its jazz soundtrack", decade: "1960s" },
  { fact: "How the Grinch Stole Christmas! (1966) narrator Boris Karloff also voiced the Grinch", decade: "1960s" },
  
  // 1970s
  { fact: "The Year Without a Santa Claus (1974) introduced the beloved Heat Miser and Snow Miser characters", decade: "1970s" },
  
  // 1980s
  { fact: "Die Hard (1988) was based on a 1979 novel where the hero was a 60-year-old retired cop", decade: "1980s" },
  { fact: "Gremlins (1984) and Indiana Jones helped create the PG-13 rating due to their dark content", decade: "1980s" },
  { fact: "A Christmas Story (1983) was filmed in Cleveland and Toronto during winter but had to use fake snow", decade: "1980s" },
  { fact: "National Lampoon's Christmas Vacation (1989) required 25,000 lights for the Griswold house", decade: "1980s" },
  { fact: "Scrooged (1988) features Bill Murray who improvised most of his final speech", decade: "1980s" },
  
  // 1990s
  { fact: "Home Alone (1990) made Macaulay Culkin the highest-paid child actor at $4.5 million for the sequel", decade: "1990s" },
  { fact: "The Nightmare Before Christmas (1993) took 3 years to make with 24 frames per second of stop-motion", decade: "1990s" },
  { fact: "Jingle All the Way (1996) inspired an annual Black Friday shopping phenomenon", decade: "1990s" },
  { fact: "The Santa Clause (1994) had Tim Allen wear a fat suit that weighed 35 pounds", decade: "1990s" },
  
  // 2000s
  { fact: "Elf (2003) used forced perspective instead of CGI to make Will Ferrell look bigger than the elves", decade: "2000s" },
  { fact: "Love Actually (2003) features 10 interconnected stories filmed across 5 London locations", decade: "2000s" },
  { fact: "The Polar Express (2004) was the first fully motion-captured animated film", decade: "2000s" },
  { fact: "The Holiday (2006) cottage was built specifically for the film and torn down after", decade: "2000s" },
  
  // 2010s
  { fact: "Klaus (2019) used new animation techniques blending 2D with lighting effects to look 3D", decade: "2010s" },
  { fact: "The Christmas Chronicles (2018) features Kurt Russell who also sings with Little Steven", decade: "2010s" },
  { fact: "Anna and the Apocalypse (2017) is the only Christmas zombie musical ever made", decade: "2010s" },
  
  // 2020s
  { fact: "Spirited (2022) features Will Ferrell and Ryan Reynolds in a musical reimagining of A Christmas Carol", decade: "2020s" },
  { fact: "Violent Night (2022) had David Harbour train for months to perform his own Santa fight scenes", decade: "2020s" },
  
  // General trivia
  { fact: "The Muppet Christmas Carol (1992) is the most accurate adaptation of Dickens' original story", decade: "1990s" },
  { fact: "Rudolph the Red-Nosed Reindeer (1964) puppets were only 5 inches tall", decade: "1960s" },
  { fact: "Batman Returns (1992) is Tim Burton's favorite of his Batman films and a Christmas movie", decade: "1990s" },
  { fact: "Trading Places (1983) made 'Merry New Year' a popular holiday greeting", decade: "1980s" },
  { fact: "Ernest Saves Christmas (1988) was the highest-grossing Ernest movie", decade: "1980s" },
  { fact: "Four Christmases (2008) was filmed in just 6 weeks during an actual holiday season", decade: "2000s" },
  { fact: "Arthur Christmas (2011) animators studied real reindeer movement at UK wildlife parks", decade: "2010s" },
  { fact: "Last Christmas (2019) features 15 George Michael and Wham! songs", decade: "2010s" },
  { fact: "The Grinch (2018) made over $500 million worldwide, the highest-grossing Christmas film", decade: "2010s" },
  { fact: "Deck the Halls (2006) used 3 generators and 10 miles of cable for the light display", decade: "2000s" },
];

export default function MovieFactBox() {
  const todaysFact = useMemo(() => {
    // Use the day of year as a seed for consistent daily facts
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Use modulo to cycle through facts
    const factIndex = dayOfYear % MOVIE_FACTS.length;
    return MOVIE_FACTS[factIndex];
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 16, 240, 0.2)', 'rgba(0, 255, 255, 0.2)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>🎬 DAILY MOVIE FACT 🎬</Text>
        <Text style={styles.decade}>{todaysFact.decade}</Text>
      </View>
      
      <Text style={styles.fact}>{todaysFact.fact}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>NEW FACT TOMORROW!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    marginVertical: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.neonCyan,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    overflow: 'hidden',
    shadowColor: COLORS.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  header: {
    paddingTop: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.neonYellow,
    letterSpacing: 2,
    textShadowColor: COLORS.neonYellow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  decade: {
    fontSize: 14,
    color: COLORS.neonPink,
    marginTop: 5,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  fact: {
    fontSize: 16,
    color: COLORS.neonCyan,
    lineHeight: 24,
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: COLORS.neonCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  footer: {
    paddingBottom: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.neonGreen,
    letterSpacing: 2,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});