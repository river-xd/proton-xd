
use std::{
  fs,
  io,
  collections::HashMap,
};

use quote::ToTokens;
use serde::{
  Serialize,
  Deserialize
};

use syn::{
  Signature,
  Type,
  ReturnType as Res
};



macro_rules! match_vars {
  ($path:expr,$def:expr)=> {
    match $path.to_token_stream().to_string().as_str() {
      "u8"=> Self::U8,
      "u16"=> Self::U16,
      "u32"=> Self::U32,
      "u64"=> Self::U64,
      "usize"=> Self::Usize,
      "i8"=> Self::I8,
      "i16"=> Self::I16,
      "i32"=> Self::I32,
      "i64"=> Self::I64,
      "isize"=> Self::Isize,
      "f32"=> Self::F32,
      "f64"=> Self::F64,
      "bool"=> Self::Bool,
      "function"=> Self::Function,
      "pointer"=> Self::Pointer,
      "buffer"=> Self::Buffer,
      _=> $def
    }
  }
}

#[derive(Serialize,Deserialize)]
#[serde(rename_all="lowercase")]
pub(crate) enum NativeType {
  U8,
  U16,
  U32,
  U64,
  Usize,
  I8,
  I16,
  I32,
  I64,
  Isize,
  F32,
  F64,
  Bool,
  Function,
  Pointer,
  Buffer
}

impl From<&Type> for NativeType {
  fn from(value: &Type)-> Self {
    match value {
      Type::Ptr(_)=> Self::Pointer,
      Type::Path(path)=> match_vars!{path,panic!()},
      _=> panic!("invalid type")
    }
  }
}


#[derive(Serialize,Deserialize,Default)]
#[serde(rename_all="lowercase")]
pub(crate) enum ReturnType {
  U8,
  U16,
  U32,
  U64,
  Usize,
  I8,
  I16,
  I32,
  I64,
  Isize,
  F32,
  F64,
  Bool,
  Function,
  Pointer,
  Buffer,
  #[default]
  Void
}

impl From<&Res> for ReturnType {
  fn from(value: &Res)-> Self {
    match value {
      Res::Default=> Default::default(),
      Res::Type(_,ty)=> {
        match ty.as_ref() {
          Type::Ptr(_)=> Self::Pointer,
          Type::Path(path)=> match_vars!(path,Self::Void),
          _=> panic!()
        }
      },
    }
  }
}











#[derive(Serialize,Deserialize)]
pub(crate) struct Bindings(HashMap<Box<str>,FnSig>);


#[derive(Serialize,Deserialize,Default)]
#[serde(rename_all="camelCase")]
pub(crate) struct FnSig {
  parameters: Box<[NativeType]>,
  result: ReturnType,
  non_blocking: Option<bool>
}


impl FnSig {
  pub(crate) fn new(sig: &Signature)-> Self {
    let mut parameters=Vec::<NativeType>::with_capacity(sig.inputs.len());

    for arg in sig.inputs.iter() {
      match arg {
        syn::FnArg::Receiver(_)=> panic!(),
        syn::FnArg::Typed(pat_type)=> {
          parameters.push(NativeType::from(pat_type.ty.as_ref()));
        },
      }
    }
    
    FnSig {
      parameters: parameters.into_boxed_slice(),
      result: (&sig.output).into(),
      non_blocking: sig.asyncness.map(|_| true)
    }
  }


  pub(crate) fn save<P: AsRef<std::path::Path>>(self,path: P)-> io::Result<()> {
    fs::write(path,serde_json::to_string_pretty(&self)?)
  }
}



