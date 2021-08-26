import React, { useState } from "react";
import { Table, Icon } from "semantic-ui-react";
import { YardTools, IFAAGroup } from "../../utils/YardTools";

const initial = {
  editable: false,
  data: [
    { distance: "10", correction: 0, tools: new YardTools(10) },
    { distance: "15", correction: 0, tools: new YardTools(15) },
    { distance: "20", correction: 0, tools: new YardTools(20) },
    { distance: "25", correction: 0, tools: new YardTools(25) },
    { distance: "30", correction: 0, tools: new YardTools(30) },
    { distance: "35", correction: 0, tools: new YardTools(35) },
    { distance: "40", correction: 0, tools: new YardTools(40) },
    { distance: "45", correction: 0, tools: new YardTools(45) },
    { distance: "50", correction: 0, tools: new YardTools(50) },
    { distance: "55", correction: 0, tools: new YardTools(55) },
    { distance: "60", correction: 0, tools: new YardTools(60) },
    { distance: "65", correction: 0, tools: new YardTools(65) },
  ],
};

const yardTools = new YardTools(7);

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
            <Table.Cell>{item.tools.toMeter()}</Table.Cell>
            <Table.Cell>{item.tools.toGroup(IFAAGroup.Adult)}</Table.Cell>
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
