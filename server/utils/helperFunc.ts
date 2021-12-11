import { singular } from 'pluralize';

// input: column's data_type
// output: string (GraphQL Data type)
module.exports.convertDataType = (type: string, columnName: string): string => {
  if (columnName === '_id') return 'ID';
  if (columnName.includes('_id')) return 'Int';
  switch (type) {
    case 'character varying': return 'String';
    case 'character': return 'String';
    case 'date': return 'String';
    case 'boolean': return 'Boolean';
    case 'integer': return 'Int';
    case 'numeric': return 'Int';
    case 'ARRAY': return '[String]';
    case 'smallint': return 'Int';
    case 'bigint': return 'Float';
    // case 'date': return 'Int';
    case 'timestamp with time zone': return 'timestamptz';
    default: return type;
  }
};

// input: column's is_nullable
// output: string (! or empty string)
module.exports.checkNullable = (isNullable: string): string => {
  if (isNullable === 'NO') {
    return '!';
  }
  return '';
};

// input: table name string
// output: pascalized and singularlized table name string
module.exports.capitalizeAndSingularize = (tableName: string): string => {
  const split = tableName.split('_');
  const pascalize = split.map((ele) => ele[0].toUpperCase() + ele.slice(1)).join(''); 
  const singularize: string = singular(pascalize);
  return singularize;
};

// input: table name string
// output: pascalized and singularlized table name string
module.exports.capitalizeAndSingularize = (tableName: string): string => {
  const split = tableName.split('_');
  const pascalize = split.map((ele) => ele[0].toUpperCase() + ele.slice(1)).join(''); 
  const singularize: string = singular(pascalize);
  return singularize;
};