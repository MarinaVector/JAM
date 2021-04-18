Vue.component('add-cup', {
  data: () => ({
    form: { cupNumber: 'M', volume: 500 },
  }),
  template: `
    <div class="card">
    
      <div class="card-body">
      <h3>Add empty cups</h3>
        <div class="row">
                 <div class="col">
            <label class="form-label">Cup number</label>
            <input class="form-control" type="text" v-model="form.cupNumber">
          </div>
          <div class="col">
            <label class="form-label">Empty cup volume (ml)</label>
            <input class="form-control" type="number" v-model="form.volume">
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="btn btn-primary" @click="add">+ Add new cup</div>
      </div>
    </div>
  `,
  methods: {
    add() {
      this.$emit('added', this.form)
      this.form = { cupNumber: 'M', volume: 500 }
    },
  },
})

Vue.component('make-jam', {
  data: () => ({
    types: ['Клубничное', 'Вишневое', 'Абрикосовое'],
    form: { type: '', volume: 5000 },
  }),
  template: `
    <div class="card">
      <div class="card-body">
      <h3>Add ready-made jam (types of jam and volumes of pots)</h3>
        <div class="row">
          <div class="col">
            <label class="form-label">Jam type</label>
            <select class="form-control" v-model="form.type">
              <option v-for="type in types" :key="type">{{ type }}</option>
            </select>
          </div>
          <div class="col">
            <label class="form-label">Volume</label>
            <input class="form-control" type="number" v-model="form.volume">
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="btn btn-success" @click="makeJam">Make Jam</div>
      </div>
    </div>
  `,
  methods: {
    makeJam() {
      this.$emit('added', this.form)
      this.form = { type: '', volume: 5000 }
    },
  },
})

Vue.component('result', {
  props: {
    emptyCups: { type: Array, default: [] },
    jamCups: { type: Array, default: [] },
  },
  template: `
    <div>
      <h4>Empty Cups</h4>
      <table class="table table-bordered table-striped mb-4">
        <thead>
          <tr>
            <td>#</td>
            <td>Volume (ml)</td>
          </tr>
        </thead>
        <tbody>
               <tr v-for="item in $props.emptyCups" :key="item.cupNumber">
            <td>{{ item.cupNumber }}</td>
            <td>{{ item.volume }}</td>
          </tr>
        </tbody>
      </table>

      <h4>Jam Cups</h4>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <td>#</td>
            <td>Jam type</td>
            <td>Volume used (ml)</td>
            <td>Volume total (ml)</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in $props.jamCups" :key="item.cupNumber">
            <td>{{ item.cupNumber }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.volumeUsed }}</td>
            <td>{{ item.volumeTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})

const app = new Vue({
  el: '#app',
  data: {
    emptyCups: [
      { cupNumber: 'M1', volume: 500 },
      { cupNumber: 'M2', volume: 300 },
      { cupNumber: 'M3', volume: 500 },
      { cupNumber: 'M4', volume: 500 },
      { cupNumber: 'M5', volume: 500 },
    ],
    jamCups: [],
  },
  methods: {
    onNewCupAdded(cup) {
      this.emptyCups.push(cup)
    },
    onNewJamAdded(jam) {
      let volumeLeft = jam.volume

      while (volumeLeft) {
        if (!this.emptyCups.length) break

        const cup = this.emptyCups.shift()

        this.jamCups.push({
          type: jam.type,
          cupNumber: cup.cupNumber,
          volumeTotal: cup.volume,
          volumeUsed: volumeLeft >= cup.volume ? cup.volume : volumeLeft,
        })

        volumeLeft = volumeLeft > cup.volume ? volumeLeft - cup.volume : 0
      }
    },
  },
})
