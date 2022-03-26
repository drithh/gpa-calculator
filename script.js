let nilai = new Array();

const addNilai = () => {
  const wrapper = document.querySelector('.wrapper');

  const nama = wrapper.querySelector('#nama-mata-kuliah').value;
  const sks = wrapper.querySelector('#sks').value;
  const nilaiAngka = wrapper.querySelector('#nilai-angka').value;

  if (nilaiAngka >= 0 && nilaiAngka <= 4) {
    nilai.push({
      nama: nama,
      sks: sks,
      nilai: convertNilai(nilaiAngka),
    });

    console.log(nilai);
  } else {
    alert('Nilai Angka Tidak Valid');
  }
};

const convertNilai = (nilai) => {
  const nilaiHuruf = ['E', 'D', 'C', 'B', 'A'];
  return nilaiHuruf[nilai];
};

const renderNilai = () => {
  nilai.forEach((item) => {
    const list = document.createElement('li');
    list.innerHTML = `${item.nama} - ${item.sks} - ${item.nilai}`;
    document.querySelector('.list-nilai').appendChild(list);
  });
};
