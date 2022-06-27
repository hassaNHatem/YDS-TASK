import axios from "axios";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {FormControl , Input, InputLabel, TextField ,MenuItem, Select, Button} from '@mui/material';
const Form = ({states , fetchData}) => {
  const [select , setSelect] = useState()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getCityId = (cityname)=>{
    let city;
    if(states.length>0){
    city = states.filter(el=>{
      return el.name === cityname
    })}
    return city[0].id
  }
  const onSubmit = (data) => {
    let schema = yup.object().shape({
      area:yup.number().required().positive().integer(),
      name:yup.string().required(),
      description:yup.string().required(),
      floor_number:yup.number().required().positive().integer(),
      apartment_number:yup.number().required().positive().integer()

    })
    const obj = {
      area:getCityId(data.city),
      name:data.Name,
      description:data.Address,
      floor_number:data.floorno,
      apartment_number:data.Apartmentno
    }
    schema.validate(obj).catch(function (err) {
      alert(err)
    })
    schema.isValid(obj).then( axios.post(`http://127.0.0.1:8000/address/`,obj).then(()=>{
      alert('data submitted successfuly')
      fetchData()
      reset()
    }))
  };
  return <form onSubmit={handleSubmit(onSubmit)}>
   <TextField   label="Name" placeholder="Name" {...register('Name' ,{required:true})}   />
 
  <TextField label="Address"  style={{marginLeft:'2px'}} placeholder="Address" {...register('Address', { required: true  })} />
   <TextField  style={{marginLeft:'2px'}} label="Apartment no" placeholder="Apartment no." {...register('Apartmentno.', { pattern: /\d+/ ,required:true})} />
 
  <TextField label="Floor no."  style={{marginLeft:'2px'}}  placeholder="Floor no." {...register('floorno', { pattern: /\d+/ , required:true})} />
  <FormControl style={{width:'200px' , marginLeft:'2px'}}>
  <InputLabel id="demo-simple-select-label">City</InputLabel>

    <Select value={select} label={'city'} onChange={(e)=>setSelect(e.target.value)}    {...register('city', {required:true })}>{states.length>0&&states.map((el=>{
      return <MenuItem value={el.name}>{el.name}</MenuItem>
    }))}</Select>
    </FormControl>
    <Button  style={{height:'55px' , marginLeft:'2px'}} type="submit"  variant="contained">Submit</Button>
  </form>;
  };

  export default Form;
