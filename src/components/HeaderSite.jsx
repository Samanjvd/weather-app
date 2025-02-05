export default function HeaderSite() {
  return (
    <div className="flex justify-between">
      <div className="color inline-block text-3xl font-bold basis-[50%] mt-6 ml-4">
        Weather App
      </div>
      <div>
        <input type="text" placeholder="Enter your city or country" />
      </div>
    </div>
  );
}
