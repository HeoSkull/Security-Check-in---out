import { StyleSheet, View } from "react-native";
import { Text, Card } from "react-native-paper";

//Model
import { Group } from "@models/Group.model";

export default function GroupCard(props: any & { group: Group }) {
  const { group } = props;

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title title={group.name} titleStyle={styles.title}></Card.Title>
      <Card.Content style={styles.content}>
        <Text style={styles.description}>{group.description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  content: {
    padding: 10,
  },
  description: {
    fontSize: 16,
  },
});
