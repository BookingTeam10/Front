import { Component } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {SuperAdminService} from "../service/superadmin.service";

//ovo cemo zameniti sa sertifikatom
interface TreeNode {
  name: string;
  children?: TreeNode[];
}


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  loadTree:string;
  tree: any[] = [];
  constructor(private adminService:SuperAdminService) {
    //this.dataSource.data = TREE_DATA;
    console.log("UDJEEE")
    this.adminService.getTree().subscribe({
      next: (data:any) => {
        if ('tree' in data) {
          const treeValue = data.tree;
          const treeValues: string[] = data.tree.split(',');
          const valuesExceptLast: string[] = treeValues.slice(0, -1);

          const getNode = (name: string) => {
            return this.tree.find(node => node.name === name);
          };

          valuesExceptLast.forEach(value => {
            const [nodeName, parentName] = value.split(' ');

            const newNode = {
              name: nodeName,
              children: []
            };

            if (parentName === 'null') {
              this.tree.push(newNode); // Dodajemo novi čvor na vrh stabla
            } else {
              const parentNode = getNode(parentName);
              if (parentNode) {
                parentNode.children.push(newNode); // Dodajemo novi čvor kao dijete postojećem čvoru
              }
            }
          });
        }

        this.dataSource.data = this.tree;
        console.log("DATA DATA DATA");
        console.log(this.dataSource.data);
        console.log(this.dataSource.data[0].name);
      }});

  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;



  // private createTree(valuesExceptLast: string[]) {
  //   const stablo:any[]=[]
  //   valuesExceptLast.forEach(value => {
  //     const parts: string[] = value.split(' ');
  //     console.log(parts[0])
  //     console.log(parts[1])
  //     var cvor={
  //       name:parts[0],
  //       children:[]
  //     }
  //     console.log(cvor)
  //     let queue;
  //     if (parts[1] == "null") {
  //       console.log("UDJE")
  //       stablo.push(cvor)
  //     } else {
  //       this.popuniMesto(stablo,parts[0],parts[1])
  //     }
  //     console.log(stablo)
  //   });
  // }
  //
  // private popuniMesto(stablo: any[], name: string, parent: string) {
  //
  // }
  printNodeName(node:any) {
    console.log("NODE");
    console.log(node.name);
  }
}

  // const TREE_DATA: TreeNode[] = [
  // {
  //   name: 'Node 2',
  //   children: [
  //     {
  //       name: 'Child 3',
  //       children: [
  //         { name: 'Grandchild 1' },
  //         { name: 'Grandchild 2' }
  //       ]
  //     }
  //   ]
  // }
  // ];



