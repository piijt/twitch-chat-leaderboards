<template>
    <div class="kpi">
        <h4>{{ name }}</h4>
        <p> {{ metric }}</p>
    </div>
</template>

<script>
export default {
    name: 'KPI',
    props: {
        name: String,
        value: Number,
        unit: String,
    },
    data() {
        return {
            metric: null,
        }
    },
    mounted() {
        this.computeValue();
    }, // after render
    watch: {
        value () {
            this.computeValue();
        }
    },
    methods: {
        computeValue() {
            this.metric = this.unit ? `${this.value} ${this.unit}` : this.value
        }
    }
}
</script>

<style scoped>
h4,
p {
    display: flex;
    justify-content: center;
    font-weight: 900;
}
p {
    color: #42b883;
}

h4 {
    color: #f1f1f1;
}

.kpi {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #42b883;
    width: auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-right: 15px;
    padding: 8px 8px 8px 8px;
}
</style>

