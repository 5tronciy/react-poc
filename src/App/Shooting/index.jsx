import React, { useState } from "react";
import { Table, Icon } from "semantic-ui-react";

const initial = {
  editable: false,
  data: [
    { distance: "9", correction: 0 },
    { distance: "14", correction: 0 },
    { distance: "18", correction: 0 },
    { distance: "23", correction: 0 },
    { distance: "27", correction: 0 },
    { distance: "32", correction: 0 },
    { distance: "37", correction: 0 },
    { distance: "41", correction: 0 },
    { distance: "46", correction: 0 },
    { distance: "50", correction: 0 },
    { distance: "55", correction: 0 },
    { distance: "59", correction: 0 },
  ],
};

const Shooting = () => {
  const [edit, setEdit] = useState(initial.editable);
  const onEdit = () => setEdit(!edit);
  return (
    <Table padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Yard</Table.HeaderCell>
          <Table.HeaderCell>Meter</Table.HeaderCell>
          <Table.HeaderCell>GA</Table.HeaderCell>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>
            <Icon
              name={edit === true ? "edit" : "edit outline"}
              onClick={onEdit}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {initial.data.map((item) => (
          <Table.Row key={item.distance.toString() + item.correction}>
            <Table.Cell>
              {edit && <Icon name="minus circle" />}
              {item.distance}
              {edit && <Icon name="plus circle" />}
            </Table.Cell>
            <Table.Cell>{Math.round(item.distance / 1.094)}</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              {edit && <Icon name="minus circle" />}
              {item.correction}
              {edit && <Icon name="plus circle" />}
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Shooting;
