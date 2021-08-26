import React, { useState } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import produce from "immer";
import { YardTools, IFAAGroup } from "../../utils/YardTools";
import { v4 as uuidv4 } from "uuid";

const initial = {
  editable: false,
  data: [
    { id: 1, distance: 10, correction: 0, tools: new YardTools(10) },
    { id: 2, distance: 15, correction: 0, tools: new YardTools(15) },
    { id: 3, distance: 20, correction: 0, tools: new YardTools(20) },
    { id: 4, distance: 25, correction: 0, tools: new YardTools(25) },
    { id: 5, distance: 30, correction: 0, tools: new YardTools(30) },
    { id: 6, distance: 35, correction: 0, tools: new YardTools(35) },
    { id: 7, distance: 40, correction: 0, tools: new YardTools(40) },
    { id: 8, distance: 45, correction: 0, tools: new YardTools(45) },
    { id: 9, distance: 50, correction: 0, tools: new YardTools(50) },
    { id: 10, distance: 55, correction: 0, tools: new YardTools(55) },
    { id: 11, distance: 60, correction: 0, tools: new YardTools(60) },
    { id: 12, distance: 65, correction: 0, tools: new YardTools(65) },
  ],
};

const Shooting = () => {
  const [data, setData] = useState(initial.data);

  const distanceHandler = (id, operator) => {
    setData(
      produce((draft) => {
        const item = draft.find((item) => item.id === id);
        item.distance += Number(operator);
        item.tools = new YardTools(item.distance);
      })
    );
  };

  const correctionHandler = (id, operator) => {
    setData(
      produce((draft) => {
        const item = draft.find((item) => item.id === id);
        item.correction += Number(operator);
      })
    );
  };

  const onAddRow = () => {
    setData(
      produce((draft) => {
        draft.push({
          id: uuidv4(),
          distance: 0,
          correction: 0,
          tools: new YardTools(0),
        });
      })
    );
  };

  const [edit, setEdit] = useState(initial.editable);
  const onEdit = () => setEdit(!edit);
  return (
    <Table padded textAlign="center" unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="6">Yard</Table.HeaderCell>
          <Table.HeaderCell width="3">Meter</Table.HeaderCell>
          <Table.HeaderCell width="3">GA</Table.HeaderCell>
          <Table.HeaderCell width="6">#</Table.HeaderCell>
          <Table.HeaderCell width="3" textAlign="right">
            <Icon
              name={edit === true ? "edit" : "edit outline"}
              onClick={onEdit}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>
              {edit && (
                <Icon
                  name="minus circle"
                  onClick={() => distanceHandler(item.id, -1)}
                />
              )}
              {item.distance}
              {edit && (
                <Icon
                  name="plus circle"
                  onClick={() => distanceHandler(item.id, 1)}
                />
              )}
            </Table.Cell>
            <Table.Cell>{item.tools.toMeter()}</Table.Cell>
            <Table.Cell>{item.tools.toGroup(IFAAGroup.Adult)}</Table.Cell>
            <Table.Cell>
              {edit && (
                <Icon
                  name="minus circle"
                  onClick={() => correctionHandler(item.id, -0.5)}
                />
              )}
              {item.correction}
              {edit && (
                <Icon
                  name="plus circle"
                  onClick={() => correctionHandler(item.id, 0.5)}
                />
              )}
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
        {edit && (
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button content="Add row" onClick={onAddRow} />
            </Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default Shooting;
