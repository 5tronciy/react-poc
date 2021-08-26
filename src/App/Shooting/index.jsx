import React from "react";
import { Table } from "semantic-ui-react";

const initial = [
  { meter: "9", correction: 0 },
  { meter: "14", correction: 0 },
  { meter: "18", correction: 0 },
  { meter: "23", correction: 0 },
  { meter: "27", correction: 0 },
  { meter: "32", correction: 0 },
  { meter: "37", correction: 0 },
  { meter: "41", correction: 0 },
  { meter: "46", correction: 0 },
  { meter: "50", correction: 0 },
  { meter: "55", correction: 0 },
  { meter: "59", correction: 0 },
];

const Shooting = () => (
  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Meter</Table.HeaderCell>
        <Table.HeaderCell>#</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {initial.map((item) => (
        <Table.Row key={item.meter.toString() + item.correction}>
          <Table.Cell>{item.meter}</Table.Cell>
          <Table.Cell>{item.correction}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default Shooting;
