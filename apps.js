Vue.component('chart',{
  template: `
  <div>
    <i>
      <u>
        Grafik editor
      </u>
    </i>
    <!-- tampilan grafik -->
    <canvas 
      width="600" 
      height="300" 
      v-gambar>
    </canvas>
    <!-- tampilan pengolahan nilai -->
    <b>
      Responden Olah Raga populer :
    </b>
    <div 
      v-for="(data, index) in datanya" 
      id="editor">
      <b>
        {{data.jenis}}
      </b>
      <div id="nilai">
        <button 
          @click='data.nilai>1?data.nilai--:data.nilai=0'>
          -
        </button>
        <input 
          type="number" 
          v-model="data.nilai" 
          readonly 
          @click='persen(index)' />
        <button 
          @click='data.nilai<1000?data.nilai++:data.nilai=1000'>
          +
        </button>
      </div>
    </div>
    <hr> 
    Jumlah Total : 
      {{total}}
  </div>
  `,
  data(){
    return{
      warna1: 'red',
      warna2: 'green',
      warna3: 'blue',
      warna4: 'purple',
      warna5: 'yellow',
      rad: Math.PI / 180,
      datanya: [
        {
          jenis: 'atletic',
          nilai: 10,
          persen: '',
          derajat: '',
          warna: 'red',
          x: '',
          y: '',
          x1: '',
          y1: ''
        },
        {
          jenis: 'renang',
          nilai: 13,
          persen: '',
          derajat: '',
          warna: 'green',
          x: '',
          y: '',
          x1: '',
          y1: ''
        },
        {
          jenis: 'bola besar',
          nilai: 30,
          persen: '',
          derajat: '',
          warna: 'blue',
          x: '',
          y: '',
          x1: '',
          y1: ''
        },
        {
          jenis: 'bola kecil',
          nilai: 25,
          persen: '',
          derajat: '',
          warna: 'purple',
          x: '',
          y: '',
          x1: '',
          y1: ''
        },
        {
          jenis: 'bela diri',
          nilai: 5,
          persen: '',
          derajat: '',
          warna: 'brown',
          x: '',
          y: '',
          x1: '',
          y1: ''
        }
      ]
    }
  },
  computed: {
    total() {
      var x = 0;
      this.datanya[0].x = 210;
      this.datanya[0].y = 50;
      for (i = 0; i < this.datanya.length; i++) {
        x += parseInt(this.datanya[i].nilai)
      }
      for (j = 0; j < this.datanya.length; j++) {
        this.datanya[j].persen = Math.round((this.datanya[j].nilai / x) * 100) / 1
      }
      for (k = 0; k < this.datanya.length; k++) {
        this.datanya[k].derajat = this.datanya[k].persen * 3.6
      }
      for (l = 1; l < this.datanya.length; l++) {
        this.datanya[l].y = parseInt(this.datanya[l - 1].y) + 25
        this.datanya[l].x = 210
      }
      return x;
    },
  },
  directives: {
    gambar: function (el, binding, vnode) {
      var c = el.getContext("2d");
      var vc = vnode.context;
      var point1 = 0;
      var point2 = 0;
      for (a = 0; a < vc.datanya.length; a++) {
        if (a == 0) {
          point1 = 0
          point2 += vc.datanya[a].derajat
        } else if (a == vc.datanya.length - 1) {
          point1 += vc.datanya[a - 1].derajat
          point2 = 360
        } else {
          point1 += vc.datanya[a - 1].derajat
          point2 += vc.datanya[a].derajat
        }
        var p2 = point2 - (vc.datanya[a].derajat / 2);
        // ambil data koordinat
        // -------------------
        vc.datanya[a].x1 = 100 + Math.cos(vc.rad * p2) * 70;
        vc.datanya[a].y1 = 150 + Math.sin(vc.rad * p2) * 70;
        var x1 = vc.datanya[a].x1 + 3;
        var y1 = vc.datanya[a].y1 + 3;
        // -------------------
        c.beginPath();
        c.moveTo(100, 150);
        c.arc(100, 150, 100, vc.rad * point1, vc.rad * point2, false);
        c.lineTo(100, 150);
        c.fillStyle = vc.datanya[a].warna;
        c.strokeStyle = 'white';
        c.fill();
        c.stroke();
        c.fillStyle = 'white';
        if (vc.datanya[a].persen === 0) {
          c.fillText(' ', x1, y1);
        } else {
          c.fillText(vc.datanya[a].persen + '%', x1, y1);
        }
        c.beginPath();
        c.fillStyle = vc.datanya[a].warna;
        c.fillRect(vc.datanya[a].x, vc.datanya[a].y, 15, 15);
        c.fill();
        c.fillStyle = 'black';
        c.fillText(vc.datanya[a].jenis, vc.datanya[a].x + 25, vc.datanya[a].y + 10)
        c.fillText('Keterangan : ', 200, 30)
      }
    }
  }
});
var app = new Vue({
  el: '#app'
})