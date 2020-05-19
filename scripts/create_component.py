#!/usr/bin/python3

import sys
import os

def get_path(d, f):
    return os.path.join(d, f)

if(len(sys.argv) <= 1):
    print('Please provide component name. python3 scripts/create_component.py <name>')
    exit(0)

name = sys.argv[1]

component_type = 'Component' if len(sys.argv) <= 2 else sys.argv[2]

parent_dir = './src/{}s/'.format(component_type)
path = get_path(parent_dir, name)

if os.path.exists(path):
    print('{} exist'.format(component_type))
    exit(0)

os.makedirs(path)

fileName = '{}.js'.format(name)
index = 'index.js'
scss = '{}.module.scss'.format(name)

file = open(get_path(path, fileName), 'w')
file.write('import React from \'react\';\n\n')
file.write('import styles from \'./{}\';\n\n'.format(scss))
file.write('const {} = () => (null);\n\n'.format(name))
file.write('export default {};\n'.format(name))
file.close()


file = open(get_path(path, index), 'w')
file.write('import {} from \'./{}\';\n\n'.format(name, name))
file.write('export default {};\n'.format(name))
file.close()

file = open(get_path(path, scss), 'w')
file.write('')
file.close()
