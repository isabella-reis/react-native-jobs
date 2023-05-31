import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const NearbyJobs = () => {
  const router = useRouter();
  // We're destructuring data, isLoading and error from our func useFetch and we're passing as params
  //the endpoint (which is search) and our query
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {/* We will check if we're currently loading. If it's loading we want to show the Activity indicator, 
        If we're not loading, maybe we have an error and if we have it we will show and error message. 
        If we are not loading and don't have an error, we will render our Flat List*/}

        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          // We're mapping data and for each job in data we're showing a nearbyJobCard.
          // It receives the job and when we navigate, the router receives the url for the job details
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
