<template>

<div class="form">
      <div class="title">Liegeplatzdaten</div>
      <div class="subtitle">Neue Liegeplatz!</div>
      <div class="input-container ic1">
        <input id="bezeichnung" ref="newbezeichnung" class="input" type="text" placeholder=" " />
        <div class="cut"></div>
        <label for="bezeichnung"  class="placeholder">Bezeichnung</label>
      </div>
           <div class="input-container ic2">
        <input id="laenge" class="input" ref="newlaenge" type="number" placeholder=" " />
        <div class="cut"></div>
        <label for="laenge"  class="placeholder">Länge (m)</label>
      </div>
           <div class="input-container ic3">
        <input id="breite" class="input" ref="newbreite" type="number" placeholder=" " />
        <div class="cut"></div>
        <label for="breite"  class="placeholder">Breite (m)</label>
      </div>
      <div class="input-container ic4">
        <input id="wassertiefe" ref="newwassertiefe" class="input" type="number" placeholder=" " />
        <div class="cut"></div>
        <label for="wassertiefe" class="placeholder">Wassertiefe (cm)</label>
      </div>
      <div class="input-container ic5">
         <select class="input" name="option" ref="newstatus" id="option">
    <option value="verfügbar">Verfügbar</option>
    <option value="besetzt">Vermietet</option>
    <option value="belegt">Besetzt</option>
    <option value="gesperrt">Gesperrt</option>
  </select>
        <div class="cut cut-short"></div>
        <label for="status" class="placeholder">Status</label>
        
      </div>
        <div class="input-container ic6">
        <input id="file" class="input" ref="newfile" type="file" placeholder=" " />
        <div class="cut cut-short"></div>
       
      </div>
      <button @click="addNewData" type="text" class="submit">senden</button>
    </div>

<div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
            <th>Bezeichnung</th>
            <th>Länge</th>
            <th>Breite</th>
            <th>Wassertiefe</th>
            <th>Status</th>
            <th>Bild</th>
            <th style="background-color:red">Aktionen</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="liegePlatz in liegeplatz">
            <td>{{liegePlatz.bezeichnung}}</td>
            <td>{{liegePlatz.laenge}}m</td>
            <td>{{liegePlatz.breite}}m</td>
            <td>{{liegePlatz.wassertiefe}}cm</td>
            <td>{{liegePlatz.status}}</td>
            <td>{{liegePlatz.bild}}</td>
            <td><button class="delete" @click="deleteData(liegePlatz.id)">löschen</button></td>
        </tr>
        
        </tbody>
    </table>
</div>
   
</template>

<script>

import {app} from '../firebase'
import {onMounted, onUnmounted, ref} from 'vue'
import {getFirestore, onSnapshot, collection, doc, deleteDoc, setDoc, addDoc, orderBy, query, Firestore} from 'firebase/firestore'

const db = getFirestore(app)



export default {
name: "Liegeplatz",
methods:{
  addNewData: function(){
    addDoc(collection(db, 'liegeplatz'), {
        bezeichnung:this.$refs.newbezeichnung.value,
        laenge:this.$refs.newlaenge.value,
        breite:this.$refs.newbreite.value,
        wassertiefe:this.$refs.newwassertiefe.value,
        status:this.$refs.newstatus.value,
        bild:this.$refs.newfile.value,
        date:Date.now()
      });
  },
  deleteData:function(id){
      deleteDoc(doc(db,'liegeplatz', id))
    }
},
data:()=>{
return{
  liegeplatz: ref([])
}
},
mounted(){
  const latestquery = query(collection(db, "liegeplatz"), orderBy('date'));
  const livemessages = onSnapshot(latestquery,(snapshot)=>{
      this.liegeplatz = snapshot.docs.map((doc)=>{
        return{
          id:doc.id,
          bezeichnung:doc.data().bezeichnung,
          breite:doc.data().breite,
          laenge:doc.data().laenge,
          status:doc.data().status,
          wassertiefe:doc.data().wassertiefe,
          bild:doc.data().bild,
          date:doc.data().date
        }
      })
    })
    onUnmounted(livemessages)
}
}

</script>

<style scoped>
*{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    background: rgba( 71, 147, 227, 1);
}
.platzbox {
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgb(111, 60, 60);
    
}

/* Table Styles */

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #FCC419;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

/*Formular*/
.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
  margin: auto;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 0px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 5px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
  margin-top:5px;
}

.ic1 {
  margin-top: 0px;
}

.ic2 {
  margin-top: 0px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 80%;
  outline: 0;
  padding: 6px 20px 0;
  width: 85%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 30px;
  line-height: 2px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 0px;
 
  text-align: center;
  width: 100%;
}

.delete{
  display: flex;
  background-color: rgb(190, 44, 18);
  border-radius: 10px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 15px;
  height: 25px;
  margin-top: 0px;
  margin: auto;
  max-width: 70px;
  align-items: center;
  justify-content: center;
  width: 100%;

}
.submit:active {
  background-color: #06b;
}




/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}



</style>