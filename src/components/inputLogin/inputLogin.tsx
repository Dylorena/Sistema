// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, InputProps, Row, Col } from 'reactstrap';
import './inputLogin.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icon: any;
}

type props = IInput & InputProps;

const InputLogin: React.FC<props> = ({ onChange, icon, ...prop }) => {
  return (
    <Row>
      <Col>
        <InputGroup className="teste">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{icon}</InputGroupText>
          </InputGroupAddon>
          <Input onChange={onChange}  {...prop} />
        </InputGroup>
      </Col>

    </Row>

  )
}

export default InputLogin;