import { withJsonFormsControlProps } from '@jsonforms/react';
import { CountrySelector } from './CountrySelector';

interface CountrySelectorControlProps {
  data: Record<string, string[]>;
  handleChange(path: string, value: string): void;
  schema: any;
  path: string;
}

const CountrySelectorC = ({
  data,
  handleChange,
  path,
  schema,
}: CountrySelectorControlProps) => (
  <CountrySelector
    data={data}
    handleChange={(value: string) => handleChange(path, value)}
    schema={schema}
  />
);

const CountrySelectorControl = withJsonFormsControlProps(CountrySelectorC);

export default CountrySelectorControl;
