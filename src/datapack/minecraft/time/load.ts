import path from 'path'
import McFn from '../../../lib/createFn';
import { getRestName } from '../../../util';

const fn = new McFn(getRestName(__filename))

fn.add('say hello')

fn.create()